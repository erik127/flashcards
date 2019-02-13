<template>
  <div>
    <div v-if='appLanguage === "en"'>
      <h1>How to use flashcards</h1>

      <h3>Introduction</h3>
      <p>Flashcards can be a simple and effective method to learn things. In the case of languages, each card will have a term on one side and it's translation on the other. With this app you don't need actual physical cards, I made them for you.</p>

      <h3>How to play</h3>
      <p>Let's say you leave the default languages (from English to Spanish). You will be presented with your first card. Look at the term and think of the translation. If you're ready, click the blue button with arrow to see the answer. If you answered right, tap the green button with checkmark. If you answered wrong, you need to tap the red icon with a cross.</p>

      <p>If it was right, the card will go to the third deck. If it was wrong, it will go to the second deck. The next card from the first deck will be presented.</p>

      <p>Every once in a while, you'll get a card from the second (wrong) or third (correct) deck. If you had it wrong the first time, maybe you'll have it right this time. If you had it right the first time and now again, the card will go to the fourth deck.</p>

      <p>The ultimate goal is to have all the cards in the done deck. To do so, all cards have to be answered right two consecutive times (so if the first time was right and the second time was wrong, then you need to answer it two times right again).</p>

      <p>Ofcourse it is easy to cheat by just pressing the green button. But you'll be cheating on yourself won't you?</p>

      <h3>Changing languages</h3>
      <p>You can change the 'to' and 'from' languages in the settings by tapping on the language names.</p>

      <h3>Adding / removing categories</h3>
      <p>In the settings you can select the categories you want to play. Over time, new categories will be added.</p>

      <h3>Playing offline</h3>
      <p>The first time you use Flashcards, all the things the browser need will be loaded in the browsers memory. And everytime you play, your progress and settings will be stored there too. This enables you to play without internet connection too, because the browser has all it needs. So you can just navigate to flashcards.stuit.online and play. Or to make it easier, you can add Flashcards to your homescreen for an app like experience.</p>

      <h3>Add to Homescreen</h3>
      <p>You can add Flashcards to you homescreen on several devices. This will give the look and feel of an app, without the need to go to an app store.</p>

      <p>On your iPhone or iPad, tap the share button and then 'add to homescreen'</p>

      <p>On an Android phone or tablet when using Chrome you will presented with a little dialog box to ask if you want to add to homescreen.</p>

      <p>On Android with Firefox, you can tap the home icon in the address bar.</p>

      <p>On your Windows computer, with Chrome you can tap the three dots button on the top right. You'll find an install to desktop option.</p>

      <p>Also Microsoft is working on having PWA's available in Microsoft Store. I'll update as soon as the app is there</p>

      <p>On Mac, the add to desktop functionality in Chrome is under construction. At the time of writing it works a bit after enabling the <a href='chrome://flags/#enable-desktop-pwas'></a> flag. OsX Safari doesn't seem to support this yet.</p>

      <button class='button button-green float-right' @click='$emit("close")'>close</button>
    </div>

    <div v-if='appLanguage === "es"'>
      <h1> Cómo usar Flashcards </h1>

      <h3> Introducción </h3>
      <p>Las Flashcards son un método simple y efectivo para aprender cosas. En el caso de los idiomas, cada tarjeta tendrá un término en un lado y su traducción en el otro. Con esta aplicación no necesitas Flashcards físicas reales, las hice para ti.</p>

      <h3> Cómo jugar </h3>
      <p>Cuando empiezas con Flashcards, se te presentará la primera tarjeta. Mira el término y piensa en la traducción. Si estas listo, haga clic en el botón azul con la flecha para ver la respuesta. Si respondiste correctamente, toca el botón verde con la marca de verificación. Si respondió mal, debe tocar el ícono rojo con la cruz.</p>

      <p>Si era correcto, la tarjeta irá al tercera pila. Si estuvo mal, irá a la segunda pila. Se presentará la próxima tarjeta del primera pila.</p>

      <p>De vez en cuando, obtendrás una tarjeta del segundo (incorrecto) o tercera (correcto) pila. Si se equivocó la primera vez, tal vez lo tenga bien esta vez. Si lo acertaste la primera vez y ahora otra vez, la tarjeta irá al cuarta pila.</p>

      <p>El objetivo final es tener todas las tarjetas en la pila hecho. Para hacerlo, todas las tarjetas deben responderse correctamente dos veces consecutivas (por lo tanto, si la primera vez fue correcta y la segunda fue incorrecta, tiene que responderla dos veces nuevamente correcto).</p>

      <p>Por supuesto, es fácil hacer trampa simplemente presionando el botón verde. Pero no te vas a engañar a tu mismo, verdad?</p>

      <h3> Cambiar idiomas </h3>
      <p>Puedes cambiar los idiomas 'a' y 'de' en la configuración tocando los nombres de los idiomas.</p>

      <h3> Añadir / eliminar categorías </h3>
      <p>En la configuración puede seleccionar las categorías que deseas jugar. Con el tiempo, se añadirán nuevas categorías.</p>

      <h3> Jugar sin conexión </h3>
      <p>La primera vez que utilice Flashcards, todas las cosas que necesita el navegador se cargarán en la memoria del navegador. Y cada vez que juegues, tu progreso y configuración se almacenarán allí también. Esto te permite jugar sin conexión a Internet, porque el navegador tiene todo lo que necesita. Así que puedes navegar a flashcards.stuit.works y jugar. O para hacerlo más fácil, puedes agregar Flashcards a tu pantalla de inicio para una experiencia como la de una aplicación.</p>

      <h3> Añadir a la pantalla de inicio </h3>
      <p>Puede agregar Flashcards a tu pantalla de inicio en varios dispositivos. Esto le dará la apariencia de una aplicación, sin la necesidad de ir a una tienda de aplicaciones (app store).</p>

      <p>En tu iPhone o iPad, toque el botón compartir y luego 'agregar a la pantalla de inicio'</p>

      <p>En un teléfono o tableta con Android, cuando usas Chrome, aparecerá un pequeño cuadro de diálogo para preguntarle si deseas agregar a la pantalla de inicio.</p>

      <p>En Android con Firefox, puedes tocar el ícono de inicio en la barra de direcciones.</p>

      <p>En tu computadora con Windows, con Chrome puedes tocar el botón de tres puntos en la parte superior derecha. Encontrarás una opción de instalar en el escritorio.</p>

      <p>También Microsoft está trabajando para tener PWAs disponibles en Microsoft Store. Voy a actualizar este informacíon tan pronto como la aplicación esté allí</p>

      <p>En Mac, la funcionalidad de agregar a escritorio en Chrome está en construcción. En el momento de escribir esto, funciona después de habilitar la marca <a href='chrome://flags/#enable-desktop-pwas'> </a>. OsX Safari no parece soportar esto todavía.</p>

      <button class = 'button button-green float-right' @click = '$emit("close")'> cerrar </button>
    </div>

    <div v-if='appLanguage === "nl"'>
      <h1>Hoe gebruik je Flashcards</h1>

      <h3> Introductie </h3>
      <p> Flashcards kunnen een eenvoudige en effectieve methode zijn om dingen te leren. In het geval van talen heeft elke kaart een term aan de ene kant en de vertaling aan de andere kant. Met deze app heb je geen fysieke kaarten nodig, deze heb ik voor je gemaakt.</p>

      <h3> Hoe speel je Flashcards </h3>
      <p>Als je het spel begint, krijg je de eerste kaart te zien. Bekijk de term en denk wat de vertaling is. Als je hem hebt, klik je op de blauwe knop met de pijl om het antwoord te zien. Als je goed hebt geantwoord, tik je op de groene knop met het vinkje. Als je verkeerd hebt geantwoord, moet je op het rode knop met het kruisje tikken.</p>

      <p>Als het antwoord goed was, gaat de kaart naar de derde stapel. Als het verkeerd was, gaat het naar het tweede stapel. De volgende kaart van het eerste stapel komt naar voren.</p>

      <p>Af en toe krijg je een kaart van het tweede (verkeerde) of derde (correcte) stapel. Als je het de eerste keer verkeerd had, heb je het deze keer misschien wel goed. Als je het de eerste keer en nu weer goed hebt, gaat de kaart naar de vierde stapel.</p>

      <p>Het uiteindelijke doel is om alle kaarten in de stapel 'klaar' te hebben. Om dit te doen, moeten alle kaarten twee keer achter elkaar goed worden beantwoord (dus als de eerste keer goed was en de tweede keer verkeerd was, dan moet je deze twee keer opnieuw goed beantwoorden).</p>

      <p>Natuurlijk is het eenvoudig om vals te spelen door altijd op de groene knop te drukken. Maar dan bedrieg je jezelf toch?</p>

      <h3> Talen wijzigen </h3>
      <p>Je kunt de 'van' en 'naar' talen in de instellingen wijzigen door op de taalnamen te tikken.</p>

      <h3> Categorieën toevoegen / verwijderen </h3>
      <p>In de instellingen kun je de categorieën selecteren die je wilt spelen. In de loop van de tijd zal ik nieuwe categoriën toevoegen.
      </p>

      <h3> Offline spelen </h3>
      <p>De eerste keer dat je Flashcards gebruikt, wordt alles wat de browser nodig heeft in het geheugen van de browser geladen. En telkens als je speelt, worden je voortgang en instellingen daar ook opgeslagen. Hierdoor kun je ook zonder internetverbinding spelen, omdat de browser alles heeft wat hij nodig heeft. Je kunt dus gewoon naar flashcards.stuit.works gaan en spelen. Of om het gemakkelijker te maken, kun je Flashcards toevoegen aan je startscherm voor een app-achtige ervaring.</p>

      <h3> Toevoegen aan startscherm </h3>
      <p>Je kunt op verschillende apparaten Flashcards toevoegen aan je startscherm. Dit geeft het uiterlijk van een app, zonder dat je naar een app store hoeft te gaan.</p>

      <p>Tik op je iPhone of iPad op de knop Delen en vervolgens op 'Toevoegen aan startscherm'.</p>

      <p>Op een Android-telefoon of -tablet wanneer je Chrome gebruikt, wordt een klein dialoogvenster weergegeven met de vraag of je wilt toevoegen aan startscherm.</p>

      <p>Op Android met Firefox kun je op het startpictogram in de adresbalk tikken.</p>

      <p>Op je Windows-computer kun je met Chrome op de knop met de drie stippen tikken in de rechterbovenhoek. Je zult een installeer op bureaublad-optie vinden.</p>

      <p>Ook werkt Microsoft aan het beschikbaar hebben van PWA's in de Microsoft Store. Ik zal deze info updaten zodra de app daar is.</p>

      <p>Op Mac is de functionaliteit voor toevoegen aan desktops in Chrome in aanbouw. Op het moment van schrijven werkt het een beetje nadat de <a href='chrome://flags/#enable-desktop-pwas'> </a> vlag is ingeschakeld. OsX Safari lijkt dit nog niet te ondersteunen.</p>

      <button class = 'button button-green float-right' @click = '$emit("close")'> sluiten </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'help',
  props: ['appLanguage']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin: 3em 1em;
}

</style>