<template>
  <div>
    <p>This is a demo of a simple offline-first web app. If you opened this app in your browser before, you can open it again even if you're not online. Your stats and settings will be there. This means you can practice your language skills in the subway, in an elevator, in a plane, in a desert or even in a submarine!</p>

    <p>Note: As this is a demo app, I don't save your statistics on a back-end server. They are saved in your browsers memory. If you delete your browsing history, you will loose your stats.</p>

    <p>If it were a 'real' app, I would sync the stats back to a back-end server whenever you're online. You can then login from any device and continue where you were. And what about adding your own cards? That would be nice too.</p>

    <h3>To do:</h3>
    <ul>
      <li>Make the app itself multi-lingual</li>
      <li>Keep stats about the percentage of cards answered wrong and right per category</li>
      <li>Create a lot more categories</li>
      <li>Add 'create your own card' functionality</li>
      <li>Add speach recognition so you can talk to the app</li>
    </ul>

    <h3>Made with:</h3>
    <ul>
      <li><a href="https://pouchdb.com" target="_blank">PouchDB</a> for local storage</li>
      <li><a href="https://vuejs.org" target="_blank">Vue.js</a> for the javascript framework</li>
      <li><a href='https://en.wikipedia.org/wiki/Leitner_system' target="_blank">Leitner</a> for the Flashcard method</li>
    </ul>

    <p class='ie-info'>NOTE: Currently this app doesn't work as nice in Internet Explorer as in other modern browsers as Chrome, Firefox, Opera or Edge.</p>

    <button class='button button-green float-right' @click='$emit("close")'>close</button>

  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin: 3em 1em;
}

</style>