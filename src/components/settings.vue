 <template>
  <div class='settings'>
    <h1> {{ strings.h1settings[appLanguage] }} </h1>
    <language-switcher :appLanguage='appLanguage' @switchLanguage='switchLanguage'></language-switcher>
    <div class='item languages'>
      <h2> {{ strings.languages[appLanguage] }} </h2>
      <div>
        <strong> {{ strings.from[appLanguage] }} </strong>
        <input type='radio' id='fromEn' value='en' v-model='settings.from'>
        <label for='fromEn'> {{ strings.english[appLanguage] }} </label>
        <input type='radio' id='fromEs' value='es' v-model='settings.from'>
        <label for='fromEs'> {{ strings.spanish[appLanguage] }} </label>
        <input type='radio' id='fromNl' value='nl' v-model='settings.from'>
        <label for='fromNl'> {{ strings.dutch[appLanguage] }} </label>
      </div>

      <div>
        <strong> {{ strings.to[appLanguage] }} </strong>
        <input type='radio' id='toEn' value='en' v-model='settings.to'>
        <label for='toEn'> {{ strings.english[appLanguage] }} </label>
        <input type='radio' id='toEs' value='es' v-model='settings.to'>
        <label for='toEs'> {{ strings.spanish[appLanguage] }} </label>
        <input type='radio' id='toNl' value='nl' v-model='settings.to'>
        <label for='toNl'> {{ strings.dutch[appLanguage] }} </label>
      </div>
    </div>

    <div class='item categories'>
      <h2> {{ strings.categories[appLanguage] }} </h2>
      <input type='checkbox' id='greetings' value='greetings' v-model='settings.categories'>
      <label for='greetings'> {{ strings.greetings[appLanguage] }} </label>
      <input type='checkbox' id='family' value='family' v-model='settings.categories'>
      <label for='family'> {{ strings.family[appLanguage] }} </label>
      <input type='checkbox' id='presReg' value='present-regular' v-model='settings.categories'>
      <label for='presReg'> {{ strings.verbsReg[appLanguage] }} </label>

      <input type='checkbox' id='simplePastReg' value='simple-past-regular' v-model='settings.categories'>
      <label for='simplePastReg'> {{ strings.simplePastReg[appLanguage] }} </label>

    </div>

    <div class='buttons'>
      <input type='button' class='button button-green float-right' value='OK' @click='$emit("change",settings)'>
      <input type='button' class='button' :value='strings.cancel[appLanguage]' @click='$emit("cancel")'>
      <input type='button' class='button' :value='strings.restart[appLanguage]' @click='$emit("restart")'>
    </div>
  </div>
</template>

<script setup>
  import LanguageSwitcher from './language-switcher.vue'

  const props = defineProps(['settings', 'appLanguage'])
  const emit = defineEmits(['switchLanguage', 'change', 'cancel', 'restart'])

  const strings = {
    h1settings: {
      en: 'settings',
      es: 'ajustes',
      nl: 'instellingen'
    },
    languages: {
      en: 'Languages',
      es: 'Lenguajes',
      nl: 'Talen'
    },
    from: {
      en: 'From:',
      es: 'De:',
      nl: 'Van:'
    },
    to: {
      en: 'To:',
      es: 'A:',
      nl: 'Naar:'
    },
    english: {
      en: 'English',
      es: 'Inglés',
      nl: 'Engels'
    },
    spanish: {
      en: 'Spanish',
      es: 'Español',
      nl: 'Spaans'
    },
    dutch: {
      en: 'Dutch',
      es: 'Holandes',
      nl: 'Nederlands'
    },
    categories: {
      en: 'Categories',
      es: 'Categorías',
      nl: 'Categorieën'
    },
    greetings: {
      en: 'Greetings',
      es: 'Saludos',
      nl: 'Begroetingen'
    },
    verbsReg: {
      en: 'Verbs (regular Spanish)',
      es: 'Verbos (regular Español)',
      nl: 'Werkwoorden (Spaans regelmatig)'
    },
    simplePastReg: {
      en: 'Simple past (regular Spanish)',
      es: 'Pretérito indefinido (regular Español)',
      nl: 'Verleden tijd (Spaans regelmatig)'
    },
    family: {
      en: 'Family',
      es: 'Familia',
      nl: 'Familie'
    },
    cancel: {
      en: 'Cancel',
      es: 'Cancelar',
      nl: 'Annuleer'
    },
    restart: {
      en: 'Restart',
      es: 'Reiniciar',
      nl: 'Herstart'
    }
  }

  function switchLanguage (language) {
    emit('switchLanguage', language)
  }

</script>


<style scoped>
.settings {
  width: 20em;
  margin: 0em auto;
  text-align: left;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

h2 {
  margin: 0 0 1em 0;
  text-align: center;
}

.item {
  padding: 0.5em;
  margin: 0 .2em;
  box-shadow: 0 0 3px -1px rgba(100,100,100,1);
  border-radius: 5px;
  margin: 1em 0.5em;
}

.languages {
  text-align: center;
  display: grid;
  text-align: center;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto;
}

.languages h2 {
  grid-column: 1 / 3;
  grid-row: 1;
}

.languages div {
  display: flex;
  flex-direction: column;
}

.language-switcher {
  position: absolute;
  top: 0em;
  right: 0;
}

</style>
