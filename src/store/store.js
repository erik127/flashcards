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
      let data = await db.allDocs({include_docs: true})
      if (data.rows.length === 0) {
        store.dispatch('SHUFFLE')
      } else {
        let counter = data.rows[0].doc.counter
        console.log(counter)
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
    GET_CARD: function ({commit}) {
      console.log('new card')
      console.log(store.state.decks, store.state.counter)
      let newRound = cardselector(store.state.decks, store.state.counter)
      if (newRound !== 'end') {
        commit('SET_CARD', {card: newRound.card})
        commit('SET_CURRENTDECK', {currentDeck: newRound.deck})
      }
      console.log(store.state.card)
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
          dbDeck.cards = deck.cards
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
        console.log(dbCounter.counter)
        console.log(counter)
        dbCounter.counter = counter
        console.log(dbCounter)
        await db.put(dbCounter)
      } catch (error) {
        console.log(error)
      }
      commit('SET_COUNTER', {counter: counter})
      store.dispatch('GET_CARD')
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
      store.dispatch('GET_CARD')
    }
  },
  mutations: {
    SET_COUNTER: (state, {counter}) => {
      console.log('counter committed')
      Vue.set(state, 'counter', counter)
    },
    SET_DECKS: (state, {decks}) => {
      console.log('decks committed')
      Vue.set(state, 'decks', decks)
    },
    SET_CARD: (state, {card}) => {
      console.log('card committed')
      Vue.set(state, 'card', card)
    },
    SET_CURRENTDECK: (state, {currentDeck}) => {
      console.log('currentDeck committed')
      Vue.set(state, 'currentDeck', currentDeck)
    },
    SET_SETTINGS: (state, {settings}) => {
      console.log('settings committed')
      Vue.set(state, 'settings', settings)
    },
    UPDATE_VIEW: (state, {view}) => {
      console.log('view committed')
      Vue.set(state, 'view', view)
    },
    LOADED: (state, {loaded}) => {
      console.log('loaded committed')
      Vue.set(state, 'loaded', loaded)
    }
  },
  getters: {
  },
  modules: {
  }
})

export default store
