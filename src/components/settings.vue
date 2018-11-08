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
    <!-- <input type='checkbox' id='vocabulary' value='vocabulary' v-model='settings.categories'>
    <label for='vocabulary'>Vocabulary</label> -->
    <input type='checkbox' id='presReg' value='present-regular' v-model='settings.categories'>
    <label for='presReg'>Verbs</label>
    <input type='button' class='float-right' value='OK' @click='$emit("change",settings)'>
    <input type='button' value='Cancel' @click='$emit("cancel")'>
    <input type='button' value='Restart' @click='$emit("restart")'>
  </div>
</template>

<script>
export default {
  name: 'settings',
  props: ['settings']
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.settings {
  width: 15em;
  margin: 1em auto;
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
  margin: 1em 0 1em 0;
}

input[type='button'] {
  width: 3em;
  margin: 1em auto;
}

input[type='button'] {
  -webkit-appearance: none;
  background: -webkit-linear-gradient(#f3f3f3, #f3f3f3);
  background: linear-gradient(#f3f3f3,#f3f3f3);
  border: 1px solid #ddd;
  border-radius: 4px;
  display: block;
  margin: 2em 2px 2px 2px;
  padding: 0;
  width: 30%;
  min-width: 4em;
  height: 2.5em;
  cursor: pointer;
  -webkit-box-shadow: 2px 2px 6px 0 rgba(150, 150, 150, 0.3);
  box-shadow: 2px 2px 6px 0 rgba(150, 150, 150, 0.3);
}

input[value='OK'] {
  float: right;
  background: -webkit-linear-gradient(#0db026, #0db026);
  background: linear-gradient(#0db026, #0db026);
  border: 1px solid #ddd;
  color: #fff;
  font-weight: bold;
}

input[type='radio'] {
  display: none;
}

input[type='radio']+label {
  width: 5em;
  padding: .2em;
}

input[type='radio']:checked+label {
  border: 2px solid #0db026;
  border-radius: 4px;
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
