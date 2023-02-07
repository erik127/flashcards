<template>
  <div v-if='loaded'>
    
    <header>
      <nav>
        <navbar :appLanguage='appLanguage' :view='view' v-on:changeView='changeView'></navbar>
      </nav>
    </header>

    <main>
      <transition name='intro'>
        <intro 
          v-if='showIntro' 
          :appLanguage='appLanguage' 
          @close='showIntro = false' 
          @switchLanguage='switchLanguage'
        ></intro>
      </transition>
      
      <settings 
        v-if='view === "settings"' 
        :settings='settings' 
        :appLanguage='appLanguage' 
        @change='updateSettings' 
        @cancel='cancel' 
        @restart='restartGame'
        @switchLanguage='switchLanguage'
      ></settings>
      
      <info
        v-if='view === "about"' 
        :appLanguage='appLanguage'
        @close='view = "flashcards"'
      ></info>
      
      <help
        v-if='view === "how to"'
        :appLanguage='appLanguage'
        @close='view = "flashcards"'
      ></help>
      
      <flashcards
        v-if='view === "flashcards"'
        :card='card' 
        :showcard='showcard' 
        :transitionIn='transitionIn' 
        :transitionOut='transitionOut' 
        :settings='settings'
        @answer='answer' 
        @getCard='getCard' 
      ></flashcards>
      
      <stats
        v-if='view === "flashcards"'
        :appLanguage='appLanguage' 
        :stats='stats' 
      ></stats>

    </main>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'

import Categories from './data/Categories'
import Cardselector from './components/cardselector'
import Navbar from './components/navbar.vue'
import Settings from './components/settings.vue'
import Info from './components/info.vue'
import Help from './components/help.vue'
import Intro from './components/intro.vue'
import Flashcards from './components/flashcards.vue'
import Stats from './components/stats.vue'

const db = new PouchDB('flashcardsDB')

const copy = object => JSON.parse(JSON.stringify(object))

/*data*/
const view = ref('flashcards')
const appLanguage = ref('en')
const showIntro = ref(false)
const settings = ref ({
  from: 'en',
  to: 'es',
  categories: ['greetings']
})
const oldSettings = ref ({})
const decks = ref ([ [], [], [], [] ])
const counter = ref (0)
const card = ref ({})
const isAnswer = ref (false)
const showcard = ref (false)
const transitionIn = ref ('fromDeck0')
const transitionOut = ref ('')
const fromDeck = ref ('')
const lastDeck = ref ('')
const loaded = ref (false)
const restart = ref ('no')

/*from mounted*/
const language = window.navigator.language
if (language === 'nl') {
  appLanguage.value = 'nl'
} else if (language === 'es') {
  appLanguage.value = 'es'
} else {
  appLanguage.value = 'en'
}

/*from created*/
try {
  const status = await db.allDocs({include_docs: true})
  if (status.rows.length === 0) {
    showIntro.value = true
    restartGame()
  } else {
    appLanguage.value = status.rows[0].doc.data
    counter.value = status.rows[1].doc.data
    decks.value = [
      status.rows[2].doc.data,
      status.rows[3].doc.data,
      status.rows[4].doc.data,
      status.rows[5].doc.data
    ]
    settings.value = status.rows[6].doc.data
    getCard()
  }
} catch (error) {
  console.log(error)
}
oldSettings.value = copy(settings.value)
loaded.value = true

/*from methods*/

async function restartGame () {
  showcard.value = false
  decks.value = [ [], [], [], [] ]
  counter.value = 0
  
  const selectedCategories = settings.value.categories

  for (let i = 0; i < selectedCategories.length; i++) {
    const deck = Categories[selectedCategories[i]].cards
    decks.value[0].push(...deck)
  }

  let status = [
    {_id: 'appLanguage', data: appLanguage.value},
    {_id: 'counter', data: counter.value},
    {_id: 'deck0', data: decks.value[0]},
    {_id: 'deck1', data: decks.value[1]},
    {_id: 'deck2', data: decks.value[2]},
    {_id: 'deck3', data: decks.value[3]},
    {_id: 'settings', data: settings.value}
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
  view.value = 'flashcards'
  window.setTimeout(function () { getCard() }, 500)
}

function getCard () {
  let newRound = Cardselector(decks.value, counter.value, lastDeck.value)
  if (newRound === 'end') {
    if (confirm('congratulations, you mastered it! Do you want to reshuffle the cards?')) {
      restartGame.value()
    } else {
      alert('OK, gracias, thanks, dank je !')
    }
  } else {
    transitionIn.value = 'fromDeck' + newRound.deck
    card.value = decks.value[newRound.deck].splice(newRound.index, 1)[0]
    fromDeck.value = newRound.deck
    isAnswer.value = false
    showcard.value = true
  }
}

function answer (reply) {
  let newDeck
  if (reply === 'wrong') {
    card.value.lastTry = 'wrong'
    newDeck = 1
  } else {
    if (card.value.lastTry === 'right') {
      newDeck = 3
    } else {
      newDeck = 2
    }
    card.value.lastTry = 'right'
  }
  lastDeck.value = newDeck
  updateDecks(fromDeck.value, newDeck, card.value)
}

async function updateDecks (fromDeck, newDeck, card) {
  decks.value[newDeck].push(card)

  transitionOut.value = 'toDeck' + newDeck

  let newDecks = [{id: 'deck' + fromDeck, cards: decks.value[fromDeck]}, {id: 'deck' + newDeck, cards: decks.value[newDeck]}]

  try {
    for (const deck of newDecks) {
      let dbDeck = await db.get(deck.id)
      dbDeck.data = deck.cards
      await db.put(dbDeck)
    }
  } catch (error) {
    console.log(error)
  }

  showcard.value = false
  updateCounter()
}

async function updateCounter () {
  counter.value++
  try {
    let dbCounter = await db.get('counter')
    dbCounter.data = counter.value
    await db.put(dbCounter)
  } catch (error) {
    console.log(error)
  }
}

function changeView (newView) {
  if (JSON.stringify(settings.value) !== JSON.stringify(oldSettings.value) && confirm('Your settings are changed. Do you want to save them?')) {
    updateSettings()
  } else {
    settings.value = copy(oldSettings.value)
  }

  if (view.value === newView) {
    view.value = 'flashcards'
  } else {
    view.value = newView
  }
}

async function updateSettings() {
  try {
    let dbSettings = await db.get('settings')
    if (JSON.stringify(dbSettings.data) !== JSON.stringify(settings.value)) {
      dbSettings.data = copy(settings.value)
      await db.put(dbSettings)
      oldSettings.value = copy(settings.value)
      restartGame()
    }
  } catch (error) {
    console.log(error)
  }
  view.value = 'flashcards'
}

function cancel () {
  settings.value = copy(oldSettings.value)
  view.value = 'flashcards'
}

async function switchLanguage (language) {
  appLanguage.value = language
  try {
    let dbLanguage = await db.get('appLanguage')
    dbLanguage.data = language
    await db.put(dbLanguage)
  } catch (error) {
    console.log(error)
  }
}

/*computed*/
const stats = computed(() => {
  return [
    decks.value[0].length,
    decks.value[1].length,
    decks.value[2].length,
    decks.value[3].length
  ]
})

</script>

<style>
#app {
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 40em;
  height: 100vh;
  max-height: 45em;
  margin: auto;
  /*padding: 1em 0 3em 0;*/
  box-sizing: border-box;
  /*display: flex;
  flex-direction: column;
  justify-content: space-between;*/
}

header {
  margin: 2em auto 1em;
}

.intro-leave-active, intro-enter-active {
  transition: opacity .4s;
}

.intro-leave-to, intro-enter-from {
  opacity: 0;
}

@media only screen and (max-height: 640px) {
  .button {
    height: 2.5em;
  }
}
</style>
