<template>
  <div id="app" v-if='loaded'>
    <navbar :view='view' v-on:changeView='changeView'></navbar>
    <header>
      <h1>Flashcards</h1>
    </header>
    <main>
      <settings :settings='settings' v-if='view === "settings"' @change='updateSettings' @cancel='cancel' @restart='restartGame'></settings>
      <info v-if='view === "info"'></info>
      <help v-if='view === "help"'></help>
      <flashcards :card='card' :showcard='showcard' :transitionIn='transitionIn' :transitionOut='transitionOut' :settings='settings' @answer='answer' @getCard='getCard' v-if='view === "home"'></flashcards>
      <stats :stats='stats' v-if='view === "home"'></stats>
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
    Stats
  },
  data () {
    return {
      view: 'home',
      settings: {
        from: 'en',
        to: 'es',
        categories: ['greetings']
      },
      decks: [ [], [], [], [] ],
      counter: 0,
      card: {},
      showcard: false,
      transitionIn: 'fromDeck0',
      transitionOut: '',
      currentDeck: '',
      loaded: false,
      restart: 'no'
    }
  },
  created: async function () {
    try {
      let status = await db.allDocs({include_docs: true})
      if (status.rows.length === 0) {
        this.restartGame()
      } else {
        this.counter = status.rows[0].doc.data
        this.decks = [
          status.rows[1].doc.data,
          status.rows[2].doc.data,
          status.rows[3].doc.data,
          status.rows[4].doc.data
        ]
        this.settings = status.rows[5].doc.data
        this.getCard()
      }
    } catch (error) {
      console.log(error)
    }
    this.loaded = true
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
      // this.$emit('loaded', true)
      // this.updateStats()
      this.view = 'home'
      let that = this
      window.setTimeout(function () { that.getCard() }, 500)
    },
    getCard: function () {
      let newRound = cardselector(this.decks, this.counter)
      if (newRound === 'end') {
        if (confirm('congratulations, you mastered it! Do you want to reshuffle the cards?')) {
          this.restartGame()
        } else {
          alert('OK, bye, chao, doei')
        }
      } else {
        this.transitionIn = 'fromDeck' + newRound.deck
        this.card = newRound.card
        this.currentDeck = newRound.deck
        this.isAnswer = false
        this.showcard = true
      }
    },
    answer: function (reply) {
      let newDeck
      if (reply === 'wrong') {
        this.card.lastry = 'wrong'
        newDeck = 1
      } else {
        if (this.card.lastry === 'right') {
          newDeck = 3
        } else {
          newDeck = 2
        }
        this.card.lastry = 'right'
      }
      this.updateDecks(this.currentDeck, newDeck, this.card)
    },
    updateDecks: async function (currentDeck, newDeck, card) {
      let i = this.decks[currentDeck].indexOf(card)
      this.decks[currentDeck].splice(i, 1)
      this.decks[newDeck].push(card)

      this.transitionOut = 'toDeck' + newDeck

      let newDecks = [{id: 'deck' + currentDeck, cards: this.decks[currentDeck]}, {id: 'deck' + newDeck, cards: this.decks[newDeck]}]

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
      if (this.view === view && view === 'settings') {
        this.cancel()
      }
      if (this.view === view) {
        this.view = 'home'
      } else {
        this.view = view
      }
    },
    updateSettings: async function (settings) {
      let parsedSettings = JSON.parse(JSON.stringify(settings))
      try {
        let dbSettings = await db.get('settings')
        if (JSON.stringify(dbSettings.data) !== JSON.stringify(settings)) {
          dbSettings.data = parsedSettings
          await db.put(dbSettings)
          console.log('set this.restart to true')
          this.restart = 'yes'
        }
      } catch (error) {
        console.log(error)
      }
      this.view = 'home'
    },
    cancel: function () {
      this.view = 'home'
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Helvetica-light, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 0.3)
}

header {
  margin: 0;
  height: 2em;
  text-align: center;
}

header span {
  display: block;
  position: relative;
  font-size: 1em;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

</style>
