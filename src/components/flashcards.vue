<template>
  <div class="flashcards">
    <p v-if='status === "answer"' class='back-button' @click='flip'><strong>&#8617</strong></p>
    <p v-if='status === "question"'>{{question}}</p>
    <p v-if='status === "answer"'>{{answer}}</p>
    <div class='button-box'>
      <input type='button' value='flip' class='flip-button' v-if='status === "question"' @click='flip'>
      <input type='button' value='wrong' class='answer-button' v-if='status === "answer"' @click='wrong'>
      <input type='button' value='right' class='answer-button' v-if='status === "answer"' @click='right'>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flashcards',
  props: ['card', 'to', 'from'],
  data () {
    return {
      status: 'question'
    }
  },
  computed: {
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
      if (this.status === 'question') {
        this.status = 'answer'
      } else {
        this.status = 'question'
      }
    },
    wrong: function () {
      this.flip()
      this.$emit('wrong')
    },
    right: function () {
      this.flip()
      this.$emit('right')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flashcards {
  height: 10em;
  width: 7em;
  margin: 0 auto;
  padding: 5%;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-box {
  width: 100%;
  align-self: flex-end;
  display: flex;
  align-content: space-between;
}

.flip-button {
  width: 100%;
  padding: 0.5em 0;
}

.answer-button {
  width: 40%;
  margin: 5%;
  padding: 0.5em 0;
}

.back-button {
  margin: 0;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  color: #ccc;
}

</style>