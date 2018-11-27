<template>
  <div>
    <h2>
      How to use flashcards
    </h2>

    <h3>Introduction</h3>
    <p>
      Flashcards can be a simple and effective method to learn things. In the case of languages, each card will have a term on one side and it's translation on the other. With this app you don't need actual physical cards, I made them for you.
    </p>

    <h3>How to play</h3>
    <p>
      Let's say you leave the default languages (from English to Spanish). You will be presented with your first card. Look at the term and think of the translation. If you're ready, click the blue button with arrow to see the answer. If you answered right, tap the green button with checkmark. If you answered wrong, you need to tap the red icon with a cross.
    </p>
    <p>
      If it was right, the card will go to the third deck. If it was wrong, it will go to the second deck. The next card from the first deck will be presented.
    </p>
    <p>
      Every once in a while, you'll get a card from the second (wrong) or third (correct) deck. If you had it wrong the first time, maybe you'll have it right this time. If you had it right the first time and now again, the card will go to the fourth deck.
    </p>
    <p>
      The ultimate goal is to have all the cards in the done deck. To do so, all cards have to be answered right two consecutive times (so if the first time was right and the second time was wrong, then you need to answer it two times right again).
    </p>
    <p>
      Ofcourse it is easy to cheat by just pressing the green button. But you'll be cheating on yourself won't you?
    </p>

    <h3>Changing languages</h3>
    <p>
      You can change the 'to' and 'from' languages in the settings by tapping on the language names.
    </p>

    <h3>Adding / removing categories</h3>
    <p>
      In the settings you can select the categories you want to play. Over time, new categories will be added.
    </p>

    <h3>Playing offline</h3>
    <p>
      The first time you use Flashcards, all the things the browser need will be loaded in the browsers memory. And everytime you pley, your progress and settings will be stored there too. This enables you to play without internet connection too, because the browser has all it needs. So you can just navigate to flashcards.stuit.online and play. Or to make it easier, you can add Flashcards to your homescreen for an app like experience.
    </p>

    <h3>Add to Homescreen</h3>
    <p>
      You can add Flashcards to you homescreen on several devices. This will give the look and feel of an app, without the need to go to an app store.
    </p>
    <p>
      On your iPhone or iPad, tap the share button and then 'add to homescreen'
    </p>
    <p>
      On an Android phone or tablet when using Chrome you will presented with a little dialog box to ask if you want to add to homescreen.
    </p>
    <p>
      On Android with Firefox, you can tap the home icon in the address bar.
    </p>
    <p>
      On your Windows computer, with Chrome you can tap the three dots button on the top right. You'll find an install to desktop option.
    </p>
    <p>
      Also Microsoft is working on having PWA's available in Microsoft Store. I'll update as soon as the app is there
    </p>
    <p>
      On Mac, the add to desktop functionality in Chrome is under construction. At the time of writing it works a bit after enabling the <a href='chrome://flags/#enable-desktop-pwas'></a> flag. OsX Safari doesn't seem to support this yet.
    </p>
  </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  /*width: 20em;*/
  margin: 3em 1em;
  /*font-size: 0.8em;*/
}

</style>