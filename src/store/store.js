import Vue from 'vue'
import Vuex from 'vuex'
// import PouchDB from 'pouchdb'
// import Greetings from '../data/greetings'
// import PresentRegular from '../data/present-regular'
// import cardselector from '../components/cardselector'

Vue.use(Vuex)

// const db = new PouchDB('flashcardsDB')

const store = new Vuex.Store({
  state: {
  },
  actions: {
    INIT_START: async function ({commit}) {
    },
    UPDATE_VIEW: function ({commit}, view) {

    },
    UPDATE_SETTINGS: async function ({commit}, settings) {

    },
    GET_CARD: function ({commit}) {
    },
    UPDATE_DECKS: async function ({commit}, move) {

    },
    UPDATE_TRANSITION_OUT: ({commit}, transitionOut) => {

    },
    UPDATE_COUNTER: async function ({commit}) {

    },
    RESTART: async function ({commit}, passedSettings) {

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
    SET_TRANSITION_IN: (state, {transitionIn}) => {
      Vue.set(state, 'transitionIn', transitionIn)
    },
    SET_TRANSITION_OUT: (state, {transitionOut}) => {
      Vue.set(state, 'transitionOut', transitionOut)
    },
    SET_SHOWCARD: (state, {showcard}) => {
      Vue.set(state, 'showcard', showcard)
    },
    LOADED: (state, {loaded}) => {
      Vue.set(state, 'loaded', loaded)
    }
  },
  getters: {
    // deck0: state => state.decks[0].length,
    // deck1: state => state.decks[1].length,
    // deck2: state => state.decks[2].length,
    // deck3: state => state.decks[3].length
  },
  modules: {
  }
})

export default store
