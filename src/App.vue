<template>
  <div id="app">
    <header>
      <span>Flashcards</span>
    </header>
    <nav>
      <input type='button' class='width-4em' value='settings' @click='toggleSettings'>
      <input type='button' class='width-4em' value='about' @click='toggleAbout'>
    </nav>
    <main>
      <settings v-if='settings'></settings>
      <about v-if='about'></about>
      <flashcards :from='from' :to='to' :card='card' v-on:right='right' v-on:wrong='wrong'></flashcards>
      <stats :deck0='deck[0].length' :deck1='deck[1].length' :deck2='deck[2].length' :deck3='deck[3].length'></stats>
    </main>
  </div>
</template>

<script>
import Settings from './components/settings'
import About from './components/about'
import Flashcards from './components/flashcards'
import Stats from './components/stats'
import Greetings from './data/greetings'
import PouchDB from 'pouchdb'
import cardselector from './components/cardselector'

const db = new PouchDB('flashcardsDB')

export default {
  name: 'app',
  components: {
    Settings,
    About,
    Flashcards,
    Stats
  },
  data () {
    return {
      settings: false,
      about: false,
      deck: [ [], [], [], [] ],
      card: {},
      from: 'en',
      to: 'es',
      counter: 0
    }
  },
  created: async function () {
    let data = await db.allDocs({include_docs: true})
    if (data.rows.length === 0) {
      this.deck[0] = Greetings
      let data = [
        {_id: 'counter', counter: this.counter},
        {_id: 'deck0', cards: this.deck[0]},
        {_id: 'deck1', cards: this.deck[1]},
        {_id: 'deck2', cards: this.deck[2]},
        {_id: 'deck3', cards: this.deck[3]}
      ]
      db.bulkDocs(data)
    } else {
      this.counter = data.rows[0].doc.counter
      this.deck[0] = data.rows[1].doc.cards
      this.deck[1] = data.rows[2].doc.cards
      this.deck[2] = data.rows[3].doc.cards
      this.deck[3] = data.rows[4].doc.cards
    }
    this.newCard()
  },
  methods: {
    newCard: function () {
      let newRound = cardselector(this.deck, this.counter)
      if (newRound !== 'end') {
        this.card = newRound.card
        this.currentDeck = newRound.deck
      }
    },
    right: function () {
      if (this.card.lastTry === 'right') {
        console.log('right second time in a row')
        this.deck[3].push(this.card)
        this.update([{id: 'deck3', cards: this.deck[3]}])
      } else {
        console.log('right first time in a row')
        this.card.lastTry = 'right'
        this.deck[2].push(this.card)
        this.update([{id: 'deck2', cards: this.deck[2]}])
      }
    },
    wrong: function () {
      this.card.lastTry = 'wrong'
      this.deck[1].push(this.card)
      this.update([{id: 'deck1', cards: this.deck[1]}])
    },
    toggleAbout: function () {
      if (this.about === true) {
        this.about = false
      } else {
        this.about = true
      }
    },
    toggleSettings: function () {
      if (this.settings === true) {
        this.settings = false
      } else {
        this.settings = true
      }
    },
    update: async function (decks) {
      let i = this.currentDeck
      console.log(i)
      this.deck[i].splice(this.deck[i].indexOf(this.card), 1)
      decks.push({id: 'deck' + i, cards: this.deck[i]})
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

main {
  text-align: center;
  margin-top: 40px;
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

.width-4em {
  width: 4em; 
}

.width-40% {
  width: 40%;
}

</style>
