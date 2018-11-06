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
    }
  },
  created: function () {
    this.$store.dispatch('INIT_START')
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
    },
    answer: function (answer) {
      let card = this.$store.state.card
      let newDeck
      if (answer === 'wrong') {
        card.lastTry = 'wrong'
        newDeck = 1
      } else {
        if (card.lastTry === 'right') {
          newDeck = 3
        } else {
          newDeck = 2
        }
        card.lastTry = 'right'
      }
      this.$store.dispatch('UPDATE_DECKS', {from: this.$store.state.currentDeck, to: newDeck, card: card})
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
