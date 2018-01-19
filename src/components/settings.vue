<template>
  <div class='settings'>
    <h2>Settings</h2>

    <h3>From language</h3>
    <input type='radio' id='fromEn' value='en' v-model='settings.from'>
    <label for='fromEn'>English</label>
    <input type='radio' id='fromEs' value='es' v-model='settings.from'>
    <label for='fromEs'>Spanish</label>
    <input type='radio' id='fromNl' value='nl' v-model='settings.from'>
    <label for='fromNl'>Dutch</label>

    <h3>To language</h3>
    <input type='radio' id='toEn' value='en' v-model='settings.to'>
    <label for='toEn'>English</label><br>
    <input type='radio' id='toEs' value='es' v-model='settings.to'>
    <label for='toEs'>Spanish</label><br>
    <input type='radio' id='toNl' value='nl' v-model='settings.to'>
    <label for='toNl'>Dutch</label><br>

    <h3>Categories</h3>
    <input type='checkbox' id='greetings' value='greetings' v-model='settings.categories'>
    <label for='greetings'>Greetings</label><br>
    <!-- <input type='checkbox' id='vocabulary' value='vocabulary' v-model='settings.categories'>
    <label for='vocabulary'>Vocabulary</label><br> -->
    <input type='checkbox' id='presReg' value='present-regular' v-model='settings.categories'>
    <label for='presReg'>Verbs</label><br>
    <input type='button' value='OK' @click='$emit("change",settings)'>
    <input type='button' value='Cancel' @click='$emit("cancel")'>
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
  margin: 2em auto;
  text-align: left;
  overflow-y: auto;
}

input {
  float: left;
  clear: left;
}

label {
  float: left;
  clear: right;
}

h3 {
  float: left;
  clear: both;
}

input[type='button'] {
  width: 3em;
  margin: 1em auto;
}

</style>
