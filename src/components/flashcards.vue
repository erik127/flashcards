<template>
  <div>
    <h1> Flashcards </h1>
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
                <svg viewBox='0 0 20 20' class='flip' @click='flip()'>
                  <title>flip</title>
                  <circle cx='10' cy='10' r='9'/>
                  <path d='m3 10 h13'/>
                  <path d='m12 5 5 5 -5 5'/>
                </svg>
              </div>
            </div>
            <div class='back'>
              <svg viewBox='0 0 20 20' class='back-button' @click='flip()'>
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
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    card: Object, 
    showcard: Boolean, 
    transitionIn: String, 
    transitionOut: String, 
    settings: Object
  })

  const emit = defineEmits(['answer', 'getCard'])

  const isAnswer = ref(false)

  const question = computed(() => {
    let card
    if (props.settings.from === 'en') {
      card = props.card.en
    } else if (props.settings.from === 'es') {
      card = props.card.es
    } else if (props.settings.from === 'nl') {
      card = props.card.nl
    }
  return card
  })

  const answer = computed(() => {
    let card
    if (props.settings.to === 'en') {
      card = props.card.en
    } else if (props.settings.to === 'es') {
      card = props.card.es
    } else if (props.settings.to === 'nl') {
      card = props.card.nl
    }
  return card
  })

  function flip () {
    isAnswer.value = !isAnswer.value
  }

  function processAnswer (reply) {
    emit('answer', reply)
  }
  function afterLeave () {
    flip()
    emit('getCard')
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  perspective: 1000px;
  margin: 0em auto;
  height: 25em;
}

.flashcards,
.front,
.back {
  height: 20em;
  width: 15em;
}

.flashcards {
  margin: 0 auto;
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
  font-size: 1.5em;
 }

.button-box {
  align-self: flex-end;
  position: relative;
  display: flex;
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

@keyframes fromDeck3 {
  from {
    transform: translate3d(200px, 700px, -2000px);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.fromDeck0 {
  animation: fromDeck0 .4s ease-out;
}

.fromDeck1 {
  animation: fromDeck1 .4s ease-in-out;
}

.toDeck1 {
  animation: fromDeck1 .4s ease-in-out reverse;
}

.fromDeck2 {
  animation: fromDeck2 .4s ease-in-out;
}

.toDeck2 {
  animation: fromDeck2 .4s ease-in-out reverse;
}

.fromDeck3 {
  animation: fromDeck3 .4s ease-in-out;
}

.toDeck3 {
  animation: fromDeck3 .4s ease-in-out reverse;
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