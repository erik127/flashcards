<template>
  <!-- <div id="app" v-if='loaded'> -->
  <div id="app">
    <navbar :view='view' v-on:changeView='changeView'></navbar>
    <header>
      <h1>Flashcards</h1>
    </header>
    <main>
      <settings :settings='settings' v-if='view === "settings"' @change='updateSettings' @cancel='cancel' @restart='restartGame'></settings>
      <info v-if='view === "info"'></info>
      <help v-if='view === "help"'></help>
      
      <!-- <flashcards :restart='restart' @loaded='isLoaded' @view='changeView(view)' @restarted='restart = false' v-if='view === "home"'></flashcards> -->
      <flashcards :settings='settings' :restart='restart' @stats='updateStats' @view='changeView(view)' @restarted='restart = false' v-if='view === "home"'></flashcards>
      <stats :deckStats='stats' v-if='view === "home"'></stats>
    </main>
  </div>
</template>

<script>
import PouchDB from 'pouchdb'
import Navbar from './components/navbar'
import Settings from './components/settings'
import Info from './components/info'
import Help from './components/help'
import Flashcards from './components/flashcards'
import Stats from './components/stats'
// import { mapState } from 'vuex'

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
      stats: ['', '', '', ''],
      // loaded: false,
      restart: 'no'
    }
  },
  created: async function () {
    try {
      let settings = await db.get('settings')
      this.settings = settings.data
    } catch (error) {
      if (error.status !== 404) {
        console.log(error)
      }
    }
  },
  methods: {
    // isLoaded: function (loaded) {
    //   this.loaded = loaded
    // },
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
    },
    updateStats: function (newStats) {
      this.stats = newStats
    },
    restartGame: function () {
      if (confirm('are you sure to restart? You will lose your history.')) {
        this.restart = 'yes'
      }
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
