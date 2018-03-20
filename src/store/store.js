import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
import Greetings from '../data/greetings'
import PresentRegular from '../data/present-regular'
import cardselector from '../components/cardselector'

Vue.use(Vuex)

const db = new PouchDB('flashcardsDB')

const store = new Vuex.Store({
  state: {
    decks: [ [], [], [], [] ],
    counter: 0,
    settings: {
      from: 'en',
      to: 'es',
      categories: ['greetings']
    },
    loaded: false,
    card: {},
    currentDeck: ''
  },
  actions: {
    INIT_START: async function ({commit}) {
      let status = await db.allDocs({include_docs: true})
      if (status.rows.length === 0) {
        store.dispatch('RESTART')
      } else {
        let counter = status.rows[0].doc.data
        let decks = [
          status.rows[1].doc.data,
          status.rows[2].doc.data,
          status.rows[3].doc.data,
          status.rows[4].doc.data
        ]
        let settings = status.rows[5].doc.data
        commit('SET_COUNTER', {counter: counter})
        commit('SET_DECKS', {decks: decks})
        commit('SET_SETTINGS', {settings: settings})
        commit('LOADED', {loaded: true})
        store.dispatch('GET_CARD')
      }
    },
    UPDATE_VIEW: function ({commit}, view) {
      commit('UPDATE_VIEW', {view: view})
    },
    UPDATE_SETTINGS: async function ({commit}, settings) {
      let parsedSettings = JSON.parse(JSON.stringify(settings))
      try {
        let dbSettings = await db.get('settings')
        if (JSON.stringify(dbSettings.data) !== JSON.stringify(settings)) {
          dbSettings.data = parsedSettings
          db.put(dbSettings)
          store.dispatch('RESTART', settings)
        }
      } catch (error) {
        console.log(error)
      }
    },
    GET_CARD: function ({commit}) {
      let newRound = cardselector(store.state.decks, store.state.counter)
      if (newRound !== 'end') {
        commit('SET_CARD', {card: newRound.card})
        commit('SET_CURRENTDECK', {currentDeck: newRound.deck})
      }
    },
    UPDATE_DECKS: async function ({commit}, move) {
      let decks = store.state.decks
      let from = decks[move.from]
      let to = decks[move.to]
      let i = from.indexOf(move.card)
      from.splice(i, 1)
      to.push(move.card)
      let newDecks = [{id: 'deck' + move.from, cards: from}, {id: 'deck' + move.to, cards: to}]
      try {
        for (const deck of newDecks) {
          let dbDeck = await db.get(deck.id)
          dbDeck.data = deck.cards
          await db.put(dbDeck)
        }
      } catch (error) {
        console.log(error)
      }
      commit('SET_DECKS', {decks: decks})
      store.dispatch('UPDATE_COUNTER')
    },
    UPDATE_COUNTER: async function ({commit}) {
      let counter = store.state.counter
      counter++
      try {
        let dbCounter = await db.get('counter')
        dbCounter.data = counter
        await db.put(dbCounter)
      } catch (error) {
        console.log(error)
      }
      commit('SET_COUNTER', {counter: counter})
      store.dispatch('GET_CARD')
    },
    RESTART: async function ({commit}, passedSettings) {
      console.log('RESTART')
      let decks = [ [], [], [], [] ]
      let counter = 0
      let settings = passedSettings || store.state.settings

      // if (!passedSettings) {
      //   settings = store.state.settings
      // } else {
      //   settings = passedSettings
      // }

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

      let status = [
        {_id: 'counter', data: counter},
        {_id: 'deck0', data: decks[0]},
        {_id: 'deck1', data: decks[1]},
        {_id: 'deck2', data: decks[2]},
        {_id: 'deck3', data: decks[3]},
        {_id: 'settings', data: settings}
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

      commit('SET_COUNTER', {counter: counter})
      commit('SET_DECKS', {decks: decks})
      commit('SET_SETTINGS', {settings: settings})
      commit('LOADED', {loaded: true})
      store.dispatch('GET_CARD')
    }
  },
  mutations: {
    SET_COUNTER: (state, {counter}) => {
      Vue.set(state, 'counter', counter)
    },
    SET_DECKS: (state, {decks}) => {
      Vue.set(state, 'decks', decks)
    },
    SET_CARD: (state, {card}) => {
      Vue.set(state, 'card', card)
    },
    SET_CURRENTDECK: (state, {currentDeck}) => {
      Vue.set(state, 'currentDeck', currentDeck)
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
    deck0: state => state.decks[0].length,
    deck1: state => state.decks[1].length,
    deck2: state => state.decks[2].length,
    deck3: state => state.decks[3].length
  },
  modules: {
  }
})

export default store
