<template>
  <div class='container'>
    <transition 
        name='cardmove'
        :enter-active-class='transitionIn'
        :leave-active-class='transitionOut'
        @after-leave="afterLeave">
      <div v-if='showcard'>
        <div class='flashcards' :class='{flipped: isAnswer}'>
          <div class='front'>
            <p class='question'>{{question}}</p>
            <div class='button-box'>
              <svg viewBox='0 0 20 20' class='flip' @click='flip'>
                <title>flip</title>
                <circle cx='10' cy='10' r='9'/>
                <path d='m3 10 h13'/>
                <path d='m12 5 5 5 -5 5'/>
              </svg>
            </div>
          </div>
          <div class='back'>
            <svg viewBox='0 0 20 20' class='back-button' @click='flip'>
                <title>back</title>
                <circle cx='10' cy='10' r='9'/>
                <path d="m8 9 -3 3 3 3"/>
                <path d="m6 12c9-0 12-3 7-6"/>
              </svg>
            <p class='answer'>{{answer}}</p>
            <div class='button-box'>
              <svg viewBox='0 0 20 20' class='wrong' @click='processAnswer("wrong")'>
                <title>wrong</title>
                <circle cx='10' cy='10' r='9'/>
                <path d='m5 5 10 10'/>
                <path d='m5 15 10 -10'/>
              </svg>
              <svg viewBox='0 0 20 20' class='right' @click='processAnswer("right")'>
                <title>right</title>
                <circle cx='10' cy='10' r='9'/>
                <path d='M 4,11 9,16 15,5'/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Greetings from '../data/greetings'
import PresentRegular from '../data/present-regular'
import cardselector from '../components/cardselector'
import PouchDB from 'pouchdb'

const db = new PouchDB('flashcardsDB')

export default {
  name: 'flashcards',
  props: ['settings', 'restart'],
  data () {
    return {
      decks: [ [], [], [], [] ],
      counter: 0,
      // status: 'question',
      // isShowing: false,
      isAnswer: false,
      // direction: 'fromDeck0'
      // enter: 'fromDeck0',
      // leave: 'toDeck3'
      card: {},
      currentDeck: '',
      transitionIn: '',
      transitionOut: '',
      showcard: 'false'
    }
  },
  created: async function () {
    let status = await db.allDocs({include_docs: true})
    if (status.rows.length === 0) {
      this.restartGame()
    } else {
      this.counter = status.rows[0].doc.data
      this.decks = [
        status.rows[1].doc.data,
        status.rows[2].doc.data,
        status.rows[3].doc.data,
        status.rows[4].doc.data
      ]

      this.updateStats()
      // console.log('setLoaded')
      // this.$emit('loaded', true)
      this.getCard()
    }
  },
  computed: {
    // to: function () {
    //   return this.$store.state.settings.to
    // },
    // from: function () {
    //   return this.$store.state.settings.from
    // },
    // card: function () {
    //   return this.$store.state.card
    // },
    question: function () {
      if (this.settings.from === 'en') {
        return this.card.en
      } else if (this.settings.from === 'es') {
        return this.card.es
      } else if (this.settings.from === 'nl') {
        return this.card.nl
      }
    },
    answer: function () {
      if (this.settings.to === 'en') {
        return this.card.en
      } else if (this.settings.to === 'es') {
        return this.card.es
      } else if (this.settings.to === 'nl') {
        return this.card.nl
      }
    }
    // transitionIn: function () {
    //   return this.$store.state.transitionIn
    // },
    // transitionOut: function () {
    //   return this.$store.state.transitionOut
    // },
    // showcard: function () {
    //   return this.$store.state.showcard
    // }
  },
  watch: {
    restart () {
      if (this.restart === 'yes') {
        console.log('restarting game')
        this.restartGame()
        this.$emit('restarted')
      }
    }
  },
  methods: {
    getCard: function () {
      let newRound = cardselector(this.decks, this.counter)
      if (newRound === 'end') {
        if (confirm('congrationlations, you mastered it! Do you want to reshuffle the cards?')) {
          this.restartGame()
        } else {
          alert('OK, bye, chao, doei')
        }
      } else {
        this.transitionIn = 'fromDeck' + newRound.deck
        this.card = newRound.card
        this.currentDeck = newRound.deck
        this.isAnswer = false
        this.showcard = true
      }
    },
    flip: function () {
      this.isAnswer = !this.isAnswer
    },
    processAnswer: function (reply) {
      let newDeck
      if (reply === 'wrong') {
        this.card.lastry = 'wrong'
        newDeck = 1
      } else {
        if (this.card.lastry === 'right') {
          newDeck = 3
        } else {
          newDeck = 2
        }
        this.card.lastry = 'right'
      }
      this.updateDecks(this.currentDeck, newDeck, this.card)
      // this.flip()
    },
    afterLeave: function () {
      this.getCard() // possibly need a settimout here?
      // window.setTimeout(function () { this.getCard() }, 600)
    },
    updateDecks: async function (currentDeck, newDeck, card) {
      let i = this.decks[currentDeck].indexOf(card)
      this.decks[currentDeck].splice(i, 1)
      this.decks[newDeck].push(card)

      this.transitionOut = 'toDeck' + newDeck

      let newDecks = [{id: 'deck' + currentDeck, cards: this.decks[currentDeck]}, {id: 'deck' + newDeck, cards: this.decks[newDeck]}]

      try {
        for (const deck of newDecks) {
          let dbDeck = await db.get(deck.id)
          dbDeck.data = deck.cards
          await db.put(dbDeck)
        }
      } catch (error) {
        console.log(error)
      }

      this.showcard = false
      this.updateCounter()
      this.updateStats()
    },
    updateCounter: async function () {
      this.counter++
      try {
        let dbCounter = await db.get('counter')
        dbCounter.data = this.counter
        await db.put(dbCounter)
      } catch (error) {
        console.log(error)
      }
    },
    updateStats: function () {
      let stats = [
        this.decks[0].length,
        this.decks[1].length,
        this.decks[2].length,
        this.decks[3].length
      ]
      this.$emit('stats', stats)
    },
    restartGame: async function () {
      this.decks = [ [], [], [], [] ]
      this.counter = 0

      if (this.settings.categories.indexOf('greetings') > -1) {
        let clonedGreetings = JSON.parse(JSON.stringify(Greetings))
        for (const card of clonedGreetings) {
          this.decks[0].push(card)
        }
      }

      if (this.settings.categories.indexOf('present-regular') > -1) {
        let clonedPresentRegular = JSON.parse(JSON.stringify(PresentRegular))
        for (const card of clonedPresentRegular) {
          this.decks[0].push(card)
        }
      }

      let status = [
        {_id: 'counter', data: this.counter},
        {_id: 'deck0', data: this.decks[0]},
        {_id: 'deck1', data: this.decks[1]},
        {_id: 'deck2', data: this.decks[2]},
        {_id: 'deck3', data: this.decks[3]},
        {_id: 'settings', data: this.settings}
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
      // this.$emit('loaded', true)
      this.updateStats()
      this.$emit('view', 'home')
      this.getCard()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  perspective: 1000px;
  margin: 3em auto;
}

.container,
.flashcards,
.front,
.back {
  height: 20em;
  width: 15em;
}

.flashcards {
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;
  clear: both;
}

.flipped {
  transform: rotateY(180deg);
}

.front,
.back {
  padding: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backface-visibility: hidden;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  border-radius: 10px;
  box-shadow:  0 0 1px 0 rgba(100,100,100,0.5), 0 1px 10px 0 rgba(0,0,0,0.15);
}

.front {
  z-index: 2;
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(-180deg);
 }


.question,
 .answer {
  text-align: center;
 }

.button-box {
  align-self: flex-end;
  position: relative;
  display: flex;
/*  align-items: center;*/
  width: 100%;
  height: 30%;
}

.button-box svg {
  width: 6em;
}

.button-box path, .back-button path {
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.flip {
  margin: 0 auto;
}

.flip circle {
  fill: #11D4FF;
}

.wrong circle {
  fill: #d41111;
}

/*.right {
  position: absolute;
  right: 0;
}*/

.right circle {
  fill: #11d42e;
}

.flip:hover,
.right:hover,
.wrong:hover {
  cursor: pointer;
}

.back-button {
  width: 2em;
  margin: 0;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
}

.back-button circle {
  fill: #ddd;
}

.back-button path {
  stroke: #bbb;
}

@keyframes fromDeck0 {
  from {
    transform: translate3d(-200px, 700px, -2000px);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}


@keyframes fromDeck1 {
  from {
    transform: translate3d(-50px, 700px, -2000px);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes toDeck1 {
  from {    
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(-50px, 700px, -2000px);
    opacity: 0;
  }
}

@keyframes fromDeck2 {
  from {
    transform: translate3d(50px, 700px, -2000px);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes toDeck2 {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(50px, 700px, -2000px);
    opacity: 0;
  }
}

@keyframes toDeck3 {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(200px, 700px, -2000px);
    opacity: 0;
  }
}

.fromDeck0 {
  animation: fromDeck0 .4s ease-out;
}

.fromDeck1 {
  animation: fromDeck1 .4s ease-in-out;
}

.toDeck1 {
  animation: toDeck1 .4s ease-in-out;
}

.fromDeck2 {
  animation: fromDeck2 .4s ease-in-out;
}

.toDeck2 {
  animation: toDeck2 .4s ease-in-out;
}

.toDeck3 {
  animation: toDeck3 .4s ease-in-out;
}


/*Internet Explorer Styles*/

.ie .flashcards {
  transition: none;
}

.ie .flipped,
.ie .front,
.ie .back {
  transform: none;
}

.ie .front {
  display: -ms-flexbox;
  display: flex;
}

.ie .back {
  display: none;
}

.ie .flipped .front {
  display: none;
}

.ie .flipped .back {
  display: -ms-flexbox;
  display: flex;
}

.ie .back-button {
  top: -8.5em;
}

</style>