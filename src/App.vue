<template>
  <div id="app" v-if='loaded'>
    <navbar :view='view' v-on:changeView='changeView'></navbar>
    <header>
      <span>Flashcards</span>
    </header>
    <main>
      <settings :settings='settings' v-if='view === "settings"' @change='updateSettings' @cancel='cancel'></settings>
      <info v-if='view === "info"'></info>
      <help v-if='view === "help"'></help>
      <flashcards @answer='answer'></flashcards>
      <stats></stats>
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
import { mapState } from 'vuex'

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
      // view: 'home',
      // card: {}
    }
  },
  created: function () {
    this.$store.dispatch('INIT_START')
    // this.newCard()
  },
  computed: mapState([
    'loaded',
    'view',
    'settings']),
  methods: {
    newCard: function () {
    },
    changeView: function (view) {
      if (this.$store.state.view === view && view === 'settings') {
        this.cancel()
      }
      if (this.$store.state.view === view) {
        this.$store.dispatch('UPDATE_VIEW', 'home')
      } else {
        this.$store.dispatch('UPDATE_VIEW', view)
      }
    },
    updateSettings: function (settings) {
      this.$store.dispatch('UPDATE_VIEW', 'home')
      this.$store.dispatch('UPDATE_SETTINGS', settings)
    },
    cancel: function () {
      this.$store.dispatch('UPDATE_VIEW', 'home')
      // console.log(this.settings)
      // let dbSettings = await db.get('settings')
      // this.settings = dbSettings.settings
      // console.log(this.settings)
      // this.view = 'home'
    },
    right: function () {
      if (this.$store.state.card.lastTry === 'right') {
        console.log('right second time in a row')
        this.decks[3].push(this.$store.state.card)
        this.update([{id: 'deck3', cards: this.$store.state.decks[3]}])
      } else {
        console.log('right first time in a row')
        this.$store.state.card.lastTry = 'right'
        this.decks[2].push(this.$store.state.card)
        this.update([{id: 'deck2', cards: this.$store.state.decks[2]}])
      }
    },
    wrong: function () {
      this.$store.state.card.lastTry = 'wrong'
      this.decks[1].push(this.$store.state.card)
      this.update([{id: 'deck1', cards: this.$store.state.decks[1]}])
    },
    answer: function (answer) {
      let newDeck
      if (answer === 'wrong') {
        this.$store.state.card.lastTry = 'wrong'
        newDeck = 1
      } else {
        if (this.$store.state.card.lastTry === 'right') {
          newDeck = 3
        } else {
          newDeck = 2
        }
        this.$store.state.card.lastTry = 'right'
      }
      this.$store.dispatch('UPDATE_DECKS', {from: this.$store.state.currentDeck, to: newDeck, card: this.$store.state.card})
    // },
    // update: async function (decks) {
    //   let i = this.currentDeck
    //   console.log(i)
    //   this.$store.state.decks[i].splice(this.decks[i].indexOf(this.card), 1)
    //   decks.push({id: 'deck' + i, cards: this.decks[i]})
    //   console.log(decks)
    //   try {
    //     for (const deck of decks) {
    //       let dbDeck = await db.get(deck.id)
    //       dbDeck.cards = deck.cards
    //       await db.put(dbDeck)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   this.counter++
    //   this.card.tries++

    //   try {
    //     let dbCounter = await db.get('counter')
    //     dbCounter.counter = this.counter
    //     await db.put(dbCounter)
    //   } catch (error) {
    //     console.log(error)
    //   }

    //   this.newCard()
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
