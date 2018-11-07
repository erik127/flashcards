<template>
  <div class='container'>
    <transition 
        name='cardmove'
        :enter-active-class='transitionIn'
        :leave-active-class='transitionOut'>
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
              <svg viewBox='0 0 20 20' class='wrong' @click='wrong'>
                <title>wrong</title>
                <circle cx='10' cy='10' r='9'/>
                <path d='m5 5 10 10'/>
                <path d='m5 15 10 -10'/>
              </svg>
              <svg viewBox='0 0 20 20' class='right' @click='right'>
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
export default {
  name: 'flashcards',
  // props: ['card'],
  data () {
    return {
      // status: 'question',
      // isShowing: false,
      isAnswer: false,
      direction: 'fromDeck0'
      // enter: 'fromDeck0',
      // leave: 'toDeck3'
    }
  },
  computed: {
    to: function () {
      return this.$store.state.settings.to
    },
    from: function () {
      return this.$store.state.settings.from
    },
    card: function () {
      return this.$store.state.card
    },
    question: function () {
      if (this.from === 'en') {
        return this.card.en
      } else if (this.from === 'es') {
        return this.card.es
      } else if (this.from === 'nl') {
        return this.card.nl
      }
    },
    answer: function () {
      if (this.to === 'en') {
        return this.card.en
      } else if (this.to === 'es') {
        return this.card.es
      } else if (this.to === 'nl') {
        return this.card.nl
      }
    },
    transitionIn: function () {
      return this.$store.state.transitionIn
    },
    transitionOut: function () {
      return this.$store.state.transitionOut
    },
    showcard: function () {
      return this.$store.state.showcard
    }
  },
  methods: {
    flip: function () {
      this.isAnswer = !this.isAnswer
    },
    wrong: function () {
      this.$emit('answer', 'wrong')
      this.flip()
    },
    right: function () {
      this.$emit('answer', 'right')
      this.flip()
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
  /*backface-visibility: hidden;*/
}

.flipped {
  transform: rotateY(180deg);
  /*box-shadow: -2px 2px 10px 0 rgba(0, 0, 0, 0.2);*/
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
  transform: rotateY(180deg);
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

</style>