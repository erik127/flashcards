<template>
  <div class="stats">
   <p>The start deck: <span class= 'float-right'> {{ deck0 }} </span></p>
   <div class = 'card-stack' v-for='n in deck0'></div>
   <p>The 'Oops I got it wrong' deck: <span class= 'float-right'> {{ deck1 }} </span></p>
   <div class = 'card-stack' v-for='n in deck1'></div>
   <p>The 'I think I know it' deck: <span class= 'float-right'> {{ deck2 }} </span></p>
   <div class = 'card-stack' v-for='n in deck2'></div>
   <p>The 'I master this' deck: <span class= 'float-right'> {{ deck3 }} </span></p>
   <div class = 'card-stack' v-for='n in deck3'></div>
  </div>
</template>

<script>
export default {
  name: 'stats',
  // props: ['deck0', 'deck1', 'deck2', 'deck3'],
  data () {
    return {

    }
  },
  computed: {
    deck0: () => this.$store.state.decks[0].length,
    deck1: () => this.$store.state.decks[1].length,
    deck2: () => this.$store.state.decks[2].length,
    deck3: () => this.$store.state.decks[3].length
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.float-right {
  float: right;
}

.stats {
  width: 15em;
  margin: 0 auto;
  text-align: left;
}

.card-stack {
  width: 3em;
  height: 0.5px;
  background-color: #aaa;
  margin-top: 0.5px;
}
</style>