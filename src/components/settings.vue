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
      <div v-for='category in Categories'>
        <input type='checkbox' :id='category.id' :value='category.id' v-model='settings.categories'>
        <label :for='category.id'> {{ category.name[appLanguage] }} </label>
      </div>
      <p class='alert' v-if='settings.categories.length === 0'>
        {{ strings.selectOne[appLanguage] }}
      </p>
    </div>    

    <div class='buttons'>
      <input type='button' class='button button-green float-right' value='OK' :disabled='settings.categories.length === 0' @click='$emit("change",settings)'>
      <input type='button' class='button' :value='strings.cancel[appLanguage]' @click='$emit("cancel")'>
      <input type='button' class='button' :value='strings.restart[appLanguage]' @click='$emit("restart")'>
    </div>
  </div>
</template>

<script setup>
  import LanguageSwitcher from './language-switcher.vue'
  import Categories from '../data/Categories'

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
    selectOne: {
      en: 'Please select at least one category',
      es: 'Elija al menos una categoría',
      nl: 'Selecteer minstens één categorie'
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
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 1em 0.5em;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.2)
}

.categories div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.3em;
}

.categories .alert {
  position: absolute;
  max-width: 100%;
  background: rgba(255, 0, 0, 0.2);
  color: #ff0000;
  padding: 0 1em;
  transform: translateY(-1.25em);
  line-height: 2;
  border-radius: 5px;
  border: 1px solid;
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
