 <template>
  <div class='settings'>
    <h3>Languages</h3>
    <div class='languages'>
      <div>
        <strong>From:</strong>
        <input type='radio' id='fromEn' value='en' v-model='settings.from'>
        <label for='fromEn'>English</label>
        <input type='radio' id='fromEs' value='es' v-model='settings.from'>
        <label for='fromEs'>Spanish</label>
        <input type='radio' id='fromNl' value='nl' v-model='settings.from'>
        <label for='fromNl'>Dutch</label>
      </div>

      <div>
        <strong>To:</strong>
        <input type='radio' id='toEn' value='en' v-model='settings.to'>
        <label for='toEn'>English</label>
        <input type='radio' id='toEs' value='es' v-model='settings.to'>
        <label for='toEs'>Spanish</label>
        <input type='radio' id='toNl' value='nl' v-model='settings.to'>
        <label for='toNl'>Dutch</label>
      </div>
    </div>

    <h3>Categories</h3>
    <input type='checkbox' id='greetings' value='greetings' v-model='settings.categories'>
    <label for='greetings'>Greetings</label>
    <input type='checkbox' id='presReg' value='present-regular' v-model='settings.categories'>
    <label for='presReg'>Verbs</label>
    <input type='button' class='button button-green float-right' value='OK' @click='$emit("change",settings)'>
    <input type='button' class='button' value='Cancel' @click='$emit("cancel")'>
    <input type='button' class='button' value='Restart' @click='$emit("restart")'>
  </div>
</template>

<script>
export default {
  name: 'settings',
  props: ['settings']
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.settings {
  width: 15em;
  margin: 1em auto;
  text-align: left;
  overflow-y: auto;
}

h3 {
  margin: 2em 0 1em 0;
}

.languages {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}

.languages div {
  display: flex;
  flex-direction: column;
}

</style>
