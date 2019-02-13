<template>
  <div class='language-switcher'>
    <div class='flag en' :class='{"active-language": appLanguage === "en"}' @click='$emit("switchLanguage", "en")'></div>
    <div class='flag es' :class='{"active-language": appLanguage === "es"}' @click='$emit("switchLanguage", "es")'></div>
    <div class='flag nl' :class='{"active-language": appLanguage === "nl"}' @click='$emit("switchLanguage", "nl")'></div>
      </div>
</template>

<script>
export default {
  name: 'language-switcher',
  props: ['appLanguage']
}
</script>

<style>
.language-switcher {
  width: 7em;
  height: 3em;
}

.flag {
  width: 3em;
  height: 3em;
  transform: scale(0.5);
  position: absolute;
  top: 0em;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  border-radius: 50px;
  opacity: .3;
}

.en {
  right: 4em;
  background-image: url('/static/img/icons/uk.svg');
}

.es {
  right: 2em;
  background-image: url('/static/img/icons/es.svg');
}

.nl {
  right: 0em;
  background-image: url('/static/img/icons/nl.svg');
}

.active-language {
  box-shadow: 0 0 0 5px #11D4FF;
  border: 5px solid white;
  box-sizing: border-box;
  opacity: 1;
}
</style>
<style>
