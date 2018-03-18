<template>
  <div class="flashcards">
    <svg viewBox='0 0 20 20' class='back-button' v-if='status === "answer"' @click='flip'>
        <title>back</title>
        <circle cx='10' cy='10' r='9'/>
        <path d="m8 9 -3 3 3 3"/>
        <path d="m6 12c9-0 12-3 7-6"/>
      </svg>
    <p v-if='status === "question"' class='width-80 centered'>{{question}}</p>
    <p v-if='status === "answer"' class='width-80 centered'>{{answer}}</p>
    <div class='button-box width-80 centered'>
<!--       <input type='button' value='flip' class='flip-button width-100' v-if='status === "question"' @click='flip'> --> 
<!--       <div class='flip-button' v-if='status === "question"' @click='flip'>
        <img src="/static/img/icons/arrow-right5.svg" class='width-100' alt="Flip">
      </div> -->
      <svg viewBox='0 0 20 20' class='flip' v-if='status === "question"' @click='flip'>
        <title>arrow-right</title>
        <circle cx='10' cy='10' r='9'/>
        <path d='m3 10 h13'/>
        <path d='m12 5 5 5 -5 5'/>
      </svg>
      <svg viewBox='0 0 20 20' class='wrong' v-if='status === "answer"' @click='wrong'>
        <title>cross</title>
        <circle cx='10' cy='10' r='9'/>
        <path d='m5 5 10 10'/>
        <path d='m5 15 10 -10'/>
      </svg>
      <svg viewBox='0 0 20 20' class='right' v-if='status === "answer"' @click='right'>
        <title>checkmark</title>
        <circle cx='10' cy='10' r='9'/>
        <path d='M 4,11 9,16 15,5'/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flashcards',
  // props: ['card'],
  data () {
    return {
      status: 'question'
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
      this.status = this.status === 'question' ? 'answer' : 'question'
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
.flashcards {
  height: 20em;
  width: 15em;
  margin: 3em auto;
  padding: 5% 0;
  border-radius: 10px;
  text-align: left;
  clear: both;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.2);
}

.button-box {
  align-self: flex-end;
  position: relative;
  display: flex;
  align-items: center;
}

/*.flip-button {
  font-size: 2em;
  width: 3em;
  height: 3em;
  margin: 0 auto;
  border-radius: 50%;
  background: -webkit-linear-gradient(#5ce, #5ce);
  background: linear-gradient(#5ce,#5ce);
  color: #fff;
}*/

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

.right {
  position: absolute;
  right: 0;
}

.right circle {
  fill: #11d42e;
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

/*.answer-icon {
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}*/

/*.answer-button {
  font-size: 1.5em;
  width: 4em;
  height: 4em;
  border-radius: 50%;
  color: #fff;
}*/


/*
.back-button {
  margin: 0;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  color: #ccc;
}*/



</style>