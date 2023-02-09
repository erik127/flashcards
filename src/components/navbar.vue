<template>
  <div class='nav-container'>
    <div class='nav-button'>
      <svg viewBox='0 0 24 24' @click='$emit("changeView", "settings")' v-bind:class="{ active: view === 'settings' }">
        <circle class='background' cx="12" cy="12" r="11"/>
        <path d="m11 8.3164-1.6895 0.97656-1.9832-1.1497-1 1.7305 1.9872 1.1536 0.00195 1.9453-2.0103 1.1748 1 1.7305 2.0044-1.1709 1.6895 0.97461-5e-5 2.3183h2l5.3e-5 -2.3085 1.6973-0.98047 1.9754 1.1246 1-1.7305-1.9715-1.1226-2e-3 -1.9648 1.9735-1.1438-1-1.7305-1.9753 1.1458-1.6973-0.97852-1e-4 -2.3107h-2zm1 0.7774c1.6049 3.312e-4 2.9059 1.3013 2.9062 2.9062-3.31e-4 1.6049-1.3013 2.9059-2.9062 2.9062-1.6049-3.31e-4 -2.9059-1.3013-2.9062-2.9062 3.312e-4 -1.6049 1.3013-2.9059 2.9062-2.9062z"/>
      </svg>
      <span class='nav-label'> {{ strings.settings[appLanguage] }}</span>
    </div>
    <div class='nav-button'>
      <svg viewBox='0 0 24 24' @click='$emit("changeView", "about")'  v-bind:class="{ active: view === 'about' }">
        <circle class='background' cx="12" cy="12" r="11"/>
        <g>
          <path d="m12 10v8"/>
          <path d="m10.5 10h3" fill="none" stroke-width="2"/>
          <path d="m10 18h4" fill="none" stroke-width="2"/>
          <circle cx="12" cy="6.5" r=".5"/>
        </g>
      </svg>
      <span class='nav-label'> {{ strings.about[appLanguage] }} </span>
    </div>
    <div class='nav-button'>
      <svg viewBox='0 0 24 24' @click='$emit("changeView", "how to")'  v-bind:class="{ active: view === 'how to' }">
        <circle class='background' cx="12" cy="12" r="11"/>
        <g>
          <path class="no-fill" d="m9 9c0-2 1-3 3-3s3 1 3 3-1 3-3 3v2"/>
          <circle class='dot' cx="12" cy="17.5" r=".5"/>
       </g>
      </svg>
      <span class='nav-label'> {{ strings.help[appLanguage] }} </span>
    </div>
  </div>
</template>

<script setup>
  
  const props = defineProps(['view', 'appLanguage'])

  const strings = {
    settings: {
      en: 'Settings',
      es: 'Ajustes',
      nl: 'Instellingen'
    },
    about: {
      en: 'About',
      es: 'Sobre',
      nl: 'Over'
    },
    help: {
      en: 'How to',
      es: 'Como jugar',
      nl: 'Hoe te spelen'
    }
  }

</script>

<style>
.nav-container {
  width: 15em;
  height: 2em;
  margin: 0em auto;
  display: flex;
  justify-content: space-around;
  position: relative;
}

.nav-button {
  /*width: 4em;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-button span {
  font-size: .6em;
  color: #666;
  opacity: 0;
  transition: opacity .3s;
  position: absolute;
  top: 100%;
}

.nav-button svg {
  width: 2em;
  filter: drop-shadow(2px 2px 0px #666);
}

.background {
  fill: #fff;
  stroke: #666;
  stroke-width: 1px;
}


g, path {
  fill: #666;
  stroke: #666;
  stroke-width: 2px;
  stroke-linecap: square;
  stroke-linejoin: round;
}

.dot, path {
  transition: stroke .3s;
}

.no-fill, .active .no-fill {
  fill:none;
}

.nav-button:hover g,
.nav-button:hover path {
  stroke: #000;
}

.nav-button:hover .dot {
  fill: #000;
}

.nav-button:hover .background {
  fill: #eee;
}

.nav-button:hover span{
  opacity: 1;
}

.active .background {
  fill: #11d4ff;
  stroke: #11d4ff;
}

.active g, .active path {
  stroke: #fff;
  fill: #fff;
}

.active .dot {
  fill: #fff;
}

.nav-button:hover .active .background {
  fill: #11d4ff;
}

.nav-button:hover .active g,
.nav-button:hover .active path {
  stroke: #fff;
}

.nav-button:hover .active .dot {
  fill: #fff;
}

</style>