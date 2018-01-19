<template>
  <div id="app">
    <navbar :view='view' v-on:changeView='changeView'></navbar>
    <header>
      <span>Flashcards</span>
    </header>
    <main>
      <settings :settings='settings' v-if='view === "settings"' @change='updateSettings' @cancel='cancel'></settings>
      <info v-if='view === "info"'></info>
      <help v-if='view === "help"'></help>
      <flashcards :from='settings.from' :to='settings.to' :card='card' @right='right' @wrong='wrong'></flashcards>
      <stats :deck0='decks[0].length' :deck1='decks[1].length' :deck2='decks[2].length' :deck3='decks[3].length'></stats>
    </main>
  </div>
</template>

<script>
import Navbar from './components/navbar'
import Settings from './components/settings'
import Info from './components/info'
import Help from './components/help'
import Flashcards from './components/flashcards'
import Stats from './components/stats'
import PouchDB from 'pouchdb'
import cardselector from './components/cardselector'
import Greetings from './data/greetings'
import PresentRegular from './data/present-regular'

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
      decks: [ [], [], [], [] ],
      card: {},
      counter: 0,
      settings: {
        from: 'en',
        to: 'es',
        categories: ['greetings']
      }
    }
  },
  created: async function () {
    let data = await db.allDocs({include_docs: true})
    if (data.rows.length === 0) {
      this.shuffle()
    } else {
      this.counter = data.rows[0].doc.counter
      this.decks[0] = data.rows[1].doc.cards
      this.decks[1] = data.rows[2].doc.cards
      this.decks[2] = data.rows[3].doc.cards
      this.decks[3] = data.rows[4].doc.cards
      this.settings = data.rows[5].doc.settings
    }
    this.newCard()
  },
  methods: {
    shuffle: function () {
      this.decks = [ [], [], [], [] ]
      if (this.settings.categories.indexOf('greetings') > -1) {
        for (const card of Greetings) {
          this.decks[0].push(card)
        }
      }
      if (this.settings.categories.indexOf('present-regular') > -1) {
        for (const card of PresentRegular) {
          this.decks[0].push(card)
        }
      }
      let data = [
        {_id: 'counter', counter: 0},
        {_id: 'deck0', cards: this.decks[0]},
        {_id: 'deck1', cards: this.decks[1]},
        {_id: 'deck2', cards: this.decks[2]},
        {_id: 'deck3', cards: this.decks[3]},
        {_id: 'settings', settings: this.settings}
      ]
      db.bulkDocs(data)
    },
    newCard: function () {
      let newRound = cardselector(this.decks, this.counter)
      if (newRound !== 'end') {
        this.card = newRound.card
        this.currentDeck = newRound.deck
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
      this.settings = settings
      this.view = 'home'
      try {
        let dbSettings = await db.get('settings')
        // if (dbSettings.settings.categories === JSON.parse(JSON.stringify(settings.categories))) {
        if (JSON.stringify(dbSettings.settings) === JSON.stringify(parsedSettings)) {
          console.log(true)
        } else {
          console.log(JSON.stringify(dbSettings.settings), JSON.stringify(parsedSettings))
          console.log(false)
          this.shuffle()
        }
        // TODO: find cleaner way to update dbSettings object
        dbSettings.settings = parsedSettings
        db.put(dbSettings)
      } catch (error) {
        console.log(error)
      }
    },
    cancel: async function () {
      console.log(this.settings)
      let dbSettings = await db.get('settings')
      this.settings = dbSettings.settings
      console.log(this.settings)
      this.view = 'home'
    },
    right: function () {
      if (this.card.lastTry === 'right') {
        console.log('right second time in a row')
        this.decks[3].push(this.card)
        this.update([{id: 'deck3', cards: this.decks[3]}])
      } else {
        console.log('right first time in a row')
        this.card.lastTry = 'right'
        this.decks[2].push(this.card)
        this.update([{id: 'deck2', cards: this.decks[2]}])
      }
    },
    wrong: function () {
      this.card.lastTry = 'wrong'
      this.decks[1].push(this.card)
      this.update([{id: 'deck1', cards: this.decks[1]}])
    },
    update: async function (decks) {
      let i = this.currentDeck
      console.log(i)
      this.decks[i].splice(this.decks[i].indexOf(this.card), 1)
      decks.push({id: 'deck' + i, cards: this.decks[i]})
      console.log(decks)
      try {
        for (const deck of decks) {
          let dbDeck = await db.get(deck.id)
          dbDeck.cards = deck.cards
          await db.put(dbDeck)
        }
      } catch (error) {
        console.log(error)
      }
      this.counter++
      this.card.tries++

      try {
        let dbCounter = await db.get('counter')
        dbCounter.counter = this.counter
        await db.put(dbCounter)
      } catch (error) {
        console.log(error)
      }

      this.newCard()
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
}


header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  text-align: center;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

nav {
  width: 8em;
  margin: 0 auto;
}

nav svg {
  width: 2em;
}

nav circle {
  fill: #ddd;
}

nav g, nav path {
  fill: #bbb;
  stroke: #bbb;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.no-fill, .active .no-fill {
  fill:none;
}

.active circle {
  fill: #666;
}

.active g, .active path {
  stroke: #fff;
  fill: #fff;
}

</style>
