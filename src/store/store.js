import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
import Greetings from '../data/greetings'
import PresentRegular from '../data/present-regular'

Vue.use(Vuex)

const db = new PouchDB('flashcardsDB')

const store = new Vuex.Store({
  state: {
    decks: [ [], [], [], [] ],
    counter: 0,
    settings: {
      from: 'en',
      to: 'es',
      categories: ['greetings'],
      loaded: false
    }
  },
  actions: {
    INIT_START: async function ({commit}) {
      console.log('in store')
      let data = await db.allDocs({include_docs: true})
      console.log(data)
      if (data.rows.length === 0) {
        console.log('got to shuffle')
        store.dispatch('SHUFFLE')
      } else {
        let counter = data.rows[0].doc.counter
        let decks = [
          data.rows[1].doc.cards,
          data.rows[2].doc.cards,
          data.rows[3].doc.cards,
          data.rows[4].doc.cards
        ]
        let settings = data.rows[5].doc.settings
        commit('SET_COUNTER', {counter: counter})
        commit('SET_DECKS', {decks: decks})
        commit('SET_SETTINGS', {settings: settings})
        commit('LOADED', {loaded: true})
      }
    },
    UPDATE_VIEW: function ({commit}, view) {
      commit('UPDATE_VIEW', {view: view})
    },
    UPDATE_SETTINGS: async function ({console}, settings) {
      let parsedSettings = JSON.parse(JSON.stringify(settings))
      try {
        let dbSettings = await db.get('settings')
        if (JSON.stringify(dbSettings.settings) === JSON.stringify(settings)) {
          console.log(true)
        } else {
          console.log(JSON.stringify(dbSettings.settings), JSON.stringify(parsedSettings))
          console.log(false)
          store.dispatch('SHUFFLE', settings)
        }
      } catch (error) {
        console.log(error)
      }
    },
    UPDATE_DECKS: async function ({commit}, move) {
      let decks = store.state.decks
      let i = decks[move.from].indexOf(move.card)
      let from = decks[move.from].splice(i, 1)
      let to = decks[move.to].push(move.card)
      let newDecks = [{id: 'deck' + move.from, cards: from}, {id: 'deck' + move.to, cards: to}]
      try {
        for (const deck of newDecks) {
          let dbDeck = await db.get(deck.id)
          dbDeck.cards = deck.cards
          await db.put(dbDeck)
        }
      } catch (error) {
        console.log(error)
      }
      commit('SET_DECKS', decks)
    },
    UPDATE_COUNTER: async function ({commit}, counter) {
      try {
        let dbCounter = await db.get('counter')
        dbCounter.counter = store.state.counter++
        await db.put(dbCounter)
      } catch (error) {
        console.log(error)
      }
      commit('SET_COUNTER', {counter: counter})
    },
    SHUFFLE: async function ({commit}, passedSettings) {
      let decks = [ [], [], [], [] ]
      let counter = 0
      let settings
      if (!passedSettings) {
        settings = store.state.settings
      } else {
        settings = passedSettings
      }
      if (settings.categories.indexOf('greetings') > -1) {
        for (const card of Greetings) {
          decks[0].push(card)
        }
      }
      if (settings.categories.indexOf('present-regular') > -1) {
        for (const card of PresentRegular) {
          decks[0].push(card)
        }
      }
      let data = [
        {_id: 'counter', counter: counter},
        {_id: 'deck0', cards: decks[0]},
        {_id: 'deck1', cards: decks[1]},
        {_id: 'deck2', cards: decks[2]},
        {_id: 'deck3', cards: decks[3]},
        {_id: 'settings', settings: store.state.settings}
      ]
      try {
        await db.bulkDocs(data)
      } catch (error) {
        console.log(error)
      }
      commit('SET_COUNTER', {counter: counter})
      commit('SET_DECKS', {decks: decks})
      commit('SET_SETTINGS', {settings: settings})
      commit('LOADED', {loaded: true})
    }
  },
  mutations: {
    SET_COUNTER: (state, {counter}) => {
      Vue.set(state, 'counter', counter)
    },
    SET_DECKS: (state, {decks}) => {
      Vue.set(state, 'decks', decks)
    },
    SET_SETTINGS: (state, {settings}) => {
      Vue.set(state, 'settings', settings)
    },
    UPDATE_VIEW: (state, {view}) => {
      Vue.set(state, 'view', view)
    },
    LOADED: (state, {loaded}) => {
      Vue.set(state, 'loaded', loaded)
    }
  },
  getters: {
  },
  modules: {
  }
})

export default store
