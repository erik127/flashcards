<template>
  <div>
    <p>This is a demo of a simple offline-first web app. If you opened this app once in your browser, you can open it again even if you're not online. And your stats and settings will be there, isn't that great? So you can practice your language skills in the subway, in an elevator, in a desert or even in a submarine!</p>

    <p>One note though: As this is a demo app, I don't save your statistics on a back end server. They are saved in your browsers memory. If you delete your browsing history, you will loose your stats. </p>

    <p>If it were a 'real' app, I would sync the stats back to a back end server whenever you're online. You can then login from any device and continue where you were.</p>

    <p>Credits:</p>
    <ul>
      <li>pouchdb</li>
      <li>vuejs</li>
    </ul>

    <p class='ie-info'>NOTE: Currently this app doesn't work as nice on Internet Explorer as on other modern browsers as Chrome, Firefox, Opera or Edge<p>


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
  width: 20em;
  margin: 3em auto;
  font-size: 0.8em;
}

</style>