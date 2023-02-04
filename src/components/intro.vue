<template>
  <div class='intro'>
    <div class='intro-inner'>
      <language-switcher :appLanguage='appLanguage' @switchLanguage='switchLanguage'></language-switcher>
      <h1> {{ strings.h1[appLanguage] }} </h1>
      <p> {{ strings.p1[appLanguage] }} 
        <svg viewBox='0 0 20 20'>
          <circle class='background' cx="10" cy="10" r="9"/>
          <g>
            <path class="no-fill" d="m7 7c0-2 1-3 3-3s3 1 3 3-1 3-3 3v2"/>
            <circle class='dot' cx="10" cy="15.5" r=".5"/>
         </g>
        </svg>.
      </p>
      <p> {{ strings.p2[appLanguage] }}  
        <svg viewBox='0 0 20 20' @click='$emit("changeView", "settings")'>
          <circle class='background' cx="10" cy="10" r="9"/>
          <path d="m9 6.3164-1.6895 0.97656-1.9832-1.1497-1 1.7305 1.9872 1.1536 0.00195 1.9453-2.0103 1.1748 1 1.7305 2.0044-1.1709 1.6895 0.97461-5e-5 2.3183h2l5.3e-5 -2.3085 1.6973-0.98047 1.9754 1.1246 1-1.7305-1.9715-1.1226-2e-3 -1.9648 1.9735-1.1438-1-1.7305-1.9753 1.1458-1.6973-0.97852-1e-4 -2.3107h-2zm1 0.7774c1.6049 3.312e-4 2.9059 1.3013 2.9062 2.9062-3.31e-4 1.6049-1.3013 2.9059-2.9062 2.9062-1.6049-3.31e-4 -2.9059-1.3013-2.9062-2.9062 3.312e-4 -1.6049 1.3013-2.9059 2.9062-2.9062z"/>
        </svg>.
      </p>
      <p> {{ strings.p3[appLanguage] }} </p>
      <button class='button button-green float-right' @click='$emit("close")'>close</button>
    </div>
  </div>
</template>

<script setup>
  import LanguageSwitcher from './language-switcher.vue'

  const props = defineProps(['appLanguage'])
  const emit = defineEmits(['switchLanguage'])

  const strings = {
    h1: {
      en: 'Welcome !',
      es: 'Bienvenido !',
      nl: 'Welkom !'
    },
    p1: {
      en: 'To learn how Flashcards work, press ',
      es: 'Para aprender como funcione Flashcards, pulse ',
      nl: 'Om te leren hoe Flashcards werkt, klik '
    },
    p2: {
      en: 'To change categories or languages, press ',
      es: 'Para cambiar categorías o idiomas, pulse ',
      nl: 'Om categorieën of taal te wijzigen, klik '
    },
    p3: {
      en: 'Good luck, buena suerte !',
      es: 'Buena suerte, good luck !',
      nl: 'Succes, buena suerte !'
    }
  }

  function switchLanguage (language) {
    emit('switchLanguage', language)
  }

</script>

<style>
.intro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-inner {
  max-width: 30em;
  padding: 2em;
  line-height: 2em;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 3px 1px #999;
  position: relative;
}

.intro-inner h1{
  margin: 2em 0 1em;
}


.intro-inner svg {
  width: 1.5em;
  height: 1.5em;
  position: relative;
  top: 0.2em;
}

.intro-inner language-switcher {
  position: absolute;
  top: 0em;
  right: 0;
}
</style>