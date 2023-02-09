<template>
  <div>
    <div v-if='appLanguage === "en"'>
      <h1>About Flashcards</h1>
      <p>This is a demo of an offline-first web app. If you opened this app in your browser before, you can open it again even if you're not online. Your stats and settings will be there. This means you can practice your language skills in the subway, in an elevator, in a plane, in a desert or even in a submarine!</p>

      <p>Note: As this is a demo app, I don't save your statistics on a back-end server. They are saved in your browsers memory. If you delete your browsing history, you will loose your stats.</p>

      <p>If it were a 'real' app, I would sync the stats back to a back-end server whenever you're online. You can then login from any device and continue where you were. And what about adding your own cards? That would be nice too.</p>

      <h2>To do:</h2>
      <ul>
        <li>Make the app itself multi-lingual</li>
        <li>Keep stats about the percentage of cards answered wrong and right per category</li>
        <li>Create a lot more categories</li>
        <li>Add 'create your own card' functionality</li>
        <li>Add speech recognition so you can talk to the app</li>
      </ul>

      <h2>Made with:</h2>
      <ul>
        <li><a href="https://pouchdb.com" target="_blank">PouchDB</a> for local storage</li>
        <li><a href="https://vuejs.org" target="_blank">Vue.js</a> for the javascript framework</li>
        <li><a href='https://en.wikipedia.org/wiki/Leitner_system' target="_blank">Leitner</a> for the Flashcard method</li>
      </ul>

      <h2>Made by:</h2>
      <ul>
        <li><a href='https://www.stuit.works'>stuit.works</a></li>
      </ul>

      <p class='ie-info'>NOTE: Currently this app doesn't work as nice in Internet Explorer as in other modern browsers as Chrome, Firefox, Opera or Edge.</p>

      <button class='button button-green float-right' @click='$emit("close")'>close</button>
    </div>

    <div v-if='appLanguage === "es"'>
      <h1>Sobre Flashcards</h1>
      <p> Esta es una demostración de una offline-first web-app (aplicación web que funcione sin conexión). Si has abrido esta aplicación en un navegador antes, puedes abrirla nuevamente tambien si no estas en línea. Tus estadísticas y configuraciones estarán allí. Esto significa que puedes practicar idiomas en el metro, en un ascensor, en un avión, en un desierto o incluso en un submarino!</p>

      <p> Nota: como esta es una aplicación de demostración, no guardo tus estadísticas en un servidor. Se guardan en la memoria de tu navegador. Si eliminas tu historial de navegación, perderás tus estadísticas. </p>

      <p> Si se tratara de una aplicación "real", sincronizaría las estadísticas con un servidor cada vez que estés en línea. Luego puedes iniciar sesión desde cualquier dispositivo y continuar donde estaba. Y añadir tus propias tarjetas? Eso también sería bueno.</p>

      <h2> To Do: </h2>
      <ul>
        <li> Mantener las estadísticas sobre el porcentaje de tarjetas incorrectas y correctas por categoría </li>
        <li> Creer muchas más categorías </li>
        <li> Añadir la funcionalidad 'crear tu propia tarjeta' </li>
        <li> Añadir el reconocimiento de voz para que puedes hablar con la aplicación </li>
      </ul>

      <h2> Hecho con: </h2>
      <ul>
        <li> <a href="https://pouchdb.com" target="_blank"> PouchDB </a> para almacenamiento local </li>
        <li> <a href="https://vuejs.org" target="_blank"> Vue.js </a> para el javascript framework </li>
        <li> <a href='https://en.wikipedia.org/wiki/Leitner_system' target="_blank"> Leitner </a> para el método de la tarjeta flash </li>
      </ul>

      <h2> Hecho por: </h2>
      <ul>
        <li><a href='https://www.stuit.works'>stuit.works</a></li>
      </ul>

      <p class = 'ie-info'> NOTA: Actualmente, esta aplicación no funciona tan bien en Internet Explorer como en otros navegadores modernos como Chrome, Firefox, Opera o Edge. </p>

      <button class = 'button button-green float-right' @click = '$emit("close")'> cerrar 
      </button>
    </div>
    <div v-if='appLanguage === "nl"'>
      <h1>Over Flashcards</h1>
      <p> Dit is een demo van een offline-first web-app. Als je deze app eerder geopend hebt, kun je deze opnieuw openen, ook als ke niet online bent. Je statistieken en instellingen zijn er gewoon. Dit betekent dat je je talen kunt oefenen in de metro, in een lift, in een vliegtuig, in een woestijn of zelfs in een onderzeeër! </p>

      <p> Opmerking: aangezien dit een demo-app is, sla ik je statistieken niet op een back-end-server op. Ze worden opgeslagen in het geheugen van je browser. Als je je browsegeschiedenis verwijdert, raak je ook je statistieken kwijt. </p>

      <p> Als het een 'echte' app zou zijn, zou ik de statistieken synchroniseren naar een back-end-server wanneer je online bent. Je kunt dan inloggen vanaf elk apparaat en doorgaan waar je was. En het toevoegen van je eigen kaarten? Dat zou ook leuk zijn. </p>

      <h2> To Do: </h2>
      <ul>
        <li> Houd statistieken bij over het percentage juist en onjuist beantwoordde kaarten per categorie </li>
        <li> Maak veel meer categorieën </li>
        <li> Voeg 'maak je eigen kaart'-functionaliteit toe </li>
        <li> Spraakherkenning toevoegen, zodat je tegen de app kunt praten </li>
      </ul>

      <h2> Gemaakt met: </h2>
      <ul>
        <li> <a href="https://pouchdb.com" target="_blank"> PouchDB </a> voor lokale opslag </li>
        <li> <a href="https://vuejs.org" target="_blank"> Vue.js </a> voor het JavaScript-framework </li>
        <li> <a href='https://en.wikipedia.org/wiki/Leitner_system' target="_blank"> Leitner </a> voor de Flashcard-methode </li>
      </ul>

      <h2>Gemaakt door:</h2>
      <ul>
        <li><a href='https://www.stuit.works'>stuit.works</a></li>
      </ul>

      <p class = 'ie-info'> opmerking: momenteel werkt deze app niet zo goed in Internet Explorer als in andere moderne browsers zoals Chrome, Firefox, Opera of Edge. </p>

      <button class = 'button button-green float-right' @click = '$emit("close")'> sluiten 
      </button>
    </div>
  </div>
</template>

<script setup>
  
  const props = defineProps(['appLanguage'])

</script>

<style scoped>
div {
  margin: 3em 1em;
}

</style>