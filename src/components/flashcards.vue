<template>
  <div class='container'>
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
</template>

<script>
export default {
  name: 'flashcards',
  // props: ['card'],
  data () {
    return {
      // status: 'question',
      isAnswer: false
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
    }
  },
  methods: {
    flip: function () {
      // this.status = this.status === 'question' ? 'answer' : 'question'
      this.isAnswer = !this.isAnswer

      // if (this.isAnswer === true) {
      //   this.isAnswer = false
      // } else {
      //   this.isAnswer = true
      // }
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
  height: 20em;
  width: 15em;
}

.flashcards,
.front,
.back {
  height: 100%;
  width: 100%;
}

.flashcards {
  position: relative;
  transition: 0.6s;
  transform-style: preserve-3d;
  clear: both;
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
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.2);
}

.front {
  z-index: 2;
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

</style>