<template>
  <div class="stats">
    <div> 
      <p>{{ deck0 }}</p>
      <p>start</p>
    </div>
    <div> 
      <p>{{ deck1 }}</p>
      <p>wrong</p>
    </div>
    <div> 
      <p>{{ deck2 }}</p>
      <p>right</p>
    </div>
    <div> 
      <p>{{ deck3 }}</p>
      <p>done</p>
    </div>
   <!--  <p>The start deck: <span class= 'float-right'> {{ deck0 }} </span></p>
    <p>The 'Oops I got it wrong' deck: <span class= 'float-right'> {{ deck1 }} </span></p>
    <p>The 'I think I know it' deck: <span class= 'float-right'> {{ deck2 }} </span></p>
    <p>The 'I master this' deck: <span class= 'float-right'> {{ deck3 }} </span></p> -->
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
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.stats div {
  width: 20%;
  height: 10%;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;

}

</style>