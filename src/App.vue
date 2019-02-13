<template>
  <div id="app" v-if='loaded'>
    <header>
      <nav>
        <navbar :appLanguage='appLanguage' :view='view' v-on:changeView='changeView'></navbar>
      </nav>
    </header>
    <main>
      <transition name='intro'>
        <intro 
          v-if='showIntro' 
          :appLanguage='appLanguage' 
          @close='showIntro = false' 
          @switchLanguage='switchLanguage'
        ></intro>
      </transition>
      <settings 
        v-if='view === "settings"' 
        :settings='settings' 
        :appLanguage='appLanguage' 
        @change='updateSettings' 
        @cancel='cancel' 
        @restart='restartGame'
        @switchLanguage='switchLanguage'
      ></settings>
      <info
        v-if='view === "about"' 
        :appLanguage='appLanguage'
        @close='view = "flashcards"'
      ></info>
      <help
        v-if='view === "how to"'
        :appLanguage='appLanguage'
        @close='view = "flashcards"'
      ></help>
      <flashcards
        v-if='view === "flashcards"'
        :card='card' 
        :showcard='showcard' 
        :transitionIn='transitionIn' 
        :transitionOut='transitionOut' 
        :settings='settings'
        @answer='answer' 
        @getCard='getCard' 
      ></flashcards>
      <stats
        v-if='view === "flashcards"'
        :appLanguage='appLanguage' 
        :stats='stats' 
      ></stats>
    </main>
  </div>
</template>

<script>
import PouchDB from 'pouchdb'
import Greetings from './data/greetings'
import PresentRegular from './data/present-regular'
import cardselector from './components/cardselector'
import Navbar from './components/navbar'
import Settings from './components/settings'
import Info from './components/info'
import Help from './components/help'
import Intro from './components/intro'
import Flashcards from './components/flashcards'
import Stats from './components/stats'

const db = new PouchDB('flashcardsDB')

export default {
  name: 'app',
  components: {
    Navbar,
    Settings,
    Info,
    Help,
    Flashcards,
    Stats,
    Intro
  },
  data () {
    return {
      view: 'flashcards',
      appLanguage: 'en',
      settings: {
        from: 'en',
        to: 'es',
        categories: ['greetings']
      },
      oldSettings: {},
      decks: [ [], [], [], [] ],
      counter: 0,
      card: {},
      showcard: false,
      transitionIn: 'fromDeck0',
      transitionOut: '',
      fromDeck: '',
      lastDeck: '',
      loaded: false,
      restart: 'no',
      showIntro: false
    }
  },
  created: async function () {
    try {
      let status = await db.allDocs({include_docs: true})
      if (status.rows.length === 0) {
        this.showIntro = true
        this.restartGame()
      } else {
        this.appLanguage = status.rows[0].doc.data
        this.counter = status.rows[1].doc.data
        this.decks = [
          status.rows[2].doc.data,
          status.rows[3].doc.data,
          status.rows[4].doc.data,
          status.rows[5].doc.data
        ]
        this.settings = status.rows[6].doc.data
        this.getCard()
      }
    } catch (error) {
      console.log(error)
    }
    this.oldSettings = copy(this.settings)
    this.loaded = true
  },
  mounted: function () {
    let language = window.navigator.language
    if (language === 'nl') {
      this.appLanguage = 'nl'
    } else if (language === 'es') {
      this.appLanguage = 'es'
    } else {
      this.appLanguage = 'en'
    }
  },
  computed: {
    stats: function () {
      let stats = [
        this.decks[0].length,
        this.decks[1].length,
        this.decks[2].length,
        this.decks[3].length
      ]
      return stats
    }
  },
  methods: {
    restartGame: async function () {
      this.showcard = false
      this.decks = [ [], [], [], [] ]
      this.counter = 0

      if (this.settings.categories.indexOf('greetings') > -1) {
        let clonedGreetings = JSON.parse(JSON.stringify(Greetings))
        for (const card of clonedGreetings) {
          this.decks[0].push(card)
        }
      }

      if (this.settings.categories.indexOf('present-regular') > -1) {
        let clonedPresentRegular = JSON.parse(JSON.stringify(PresentRegular))
        for (const card of clonedPresentRegular) {
          this.decks[0].push(card)
        }
      }

      let status = [
        {_id: 'appLanguage', data: this.appLanguage},
        {_id: 'counter', data: this.counter},
        {_id: 'deck0', data: this.decks[0]},
        {_id: 'deck1', data: this.decks[1]},
        {_id: 'deck2', data: this.decks[2]},
        {_id: 'deck3', data: this.decks[3]},
        {_id: 'settings', data: this.settings}
      ]

      for (let i = 0; i < status.length; i++) {
        try {
          let item = await db.get(status[i]._id)
          item.data = status[i].data
          await db.put(item)
        } catch (error) {
          if (error.status === 404) {
            await db.put(status[i])
          } else {
            console.log(error)
          }
        }
      }
      this.view = 'flashcards'
      let that = this
      window.setTimeout(function () { that.getCard() }, 500)
    },
    getCard: function () {
      let newRound = cardselector(this.decks, this.counter, this.lastDeck)
      if (newRound === 'end') {
        if (confirm('congratulations, you mastered it! Do you want to reshuffle the cards?')) {
          this.restartGame()
        } else {
          alert('OK, bye, chao, doei')
        }
      } else {
        this.transitionIn = 'fromDeck' + newRound.deck
        this.card = this.decks[newRound.deck].splice(newRound.index, 1)[0]
        this.fromDeck = newRound.deck
        this.isAnswer = false
        this.showcard = true
      }
    },
    answer: function (reply) {
      let newDeck
      if (reply === 'wrong') {
        this.card.lastTry = 'wrong'
        newDeck = 1
      } else {
        if (this.card.lastTry === 'right') {
          newDeck = 3
        } else {
          newDeck = 2
        }
        this.card.lastTry = 'right'
      }
      this.lastDeck = newDeck
      this.updateDecks(this.fromDeck, newDeck, this.card)
    },
    updateDecks: async function (fromDeck, newDeck, card) {
      this.decks[newDeck].push(card)

      this.transitionOut = 'toDeck' + newDeck

      let newDecks = [{id: 'deck' + fromDeck, cards: this.decks[fromDeck]}, {id: 'deck' + newDeck, cards: this.decks[newDeck]}]

      try {
        for (const deck of newDecks) {
          let dbDeck = await db.get(deck.id)
          dbDeck.data = deck.cards
          await db.put(dbDeck)
        }
      } catch (error) {
        console.log(error)
      }

      this.showcard = false
      this.updateCounter()
    },
    updateCounter: async function () {
      this.counter++
      try {
        let dbCounter = await db.get('counter')
        dbCounter.data = this.counter
        await db.put(dbCounter)
      } catch (error) {
        console.log(error)
      }
    },
    changeView: function (view) {
      if (JSON.stringify(this.settings) !== JSON.stringify(this.oldSettings) && confirm('Your settings are changed. Do you want to save them?')) {
        this.updateSettings()
      } else {
        this.settings = copy(this.oldSettings)
      }

      if (this.view === view) {
        this.view = 'flashcards'
      } else {
        this.view = view
      }
    },
    updateSettings: async function () {
      try {
        let dbSettings = await db.get('settings')
        if (JSON.stringify(dbSettings.data) !== JSON.stringify(this.settings)) {
          dbSettings.data = copy(this.settings)
          await db.put(dbSettings)
          this.oldSettings = copy(this.settings)
          this.restartGame()
        }
      } catch (error) {
        console.log(error)
      }
      this.view = 'flashcards'
    },
    cancel: function () {
      this.settings = copy(this.oldSettings)
      this.view = 'flashcards'
    },
    switchLanguage: async function (lan) {
      this.appLanguage = lan
      try {
        let dbLanguage = await db.get('appLanguage')
        dbLanguage.data = this.appLanguage
        await db.put(dbLanguage)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const copy = object => JSON.parse(JSON.stringify(object))
</script>

<style>
#app {
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 40em;
  height: 100vh;
  max-height: 45em;
  margin: auto;
  /*padding: 1em 0 3em 0;*/
  box-sizing: border-box;
  /*display: flex;
  flex-direction: column;
  justify-content: space-between;*/
}

header {
  margin: 2em auto 1em;
}

.intro-leave-active, intro-enter-active {
  transition: opacity .4s;
}

.intro-leave-to, intro-enter-from {
  opacity: 0;
}

@media only screen and (max-height: 640px) {
  .button {
    height: 2.5em;
  }
}

</style>
