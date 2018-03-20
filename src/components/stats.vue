<template>
  <div class="stats">
   <p>The start deck: <span class= 'float-right'> {{ deck0 }} </span></p>
   <p>The 'Oops I got it wrong' deck: <span class= 'float-right'> {{ deck1 }} </span></p>
   <p>The 'I think I know it' deck: <span class= 'float-right'> {{ deck2 }} </span></p>
   <p>The 'I master this' deck: <span class= 'float-right'> {{ deck3 }} </span></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'stats',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'deck0',
      'deck1',
      'deck2',
      'deck3'
    ])
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
</style>