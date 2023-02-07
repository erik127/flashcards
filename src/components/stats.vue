<template>
  <div class="stats">
    <div :class='stackheight(stats[0])'> 
      <p> {{ stats[0] }} </p>
      <p> {{ strings.start[appLanguage] }} </p>
    </div>
    <div :class='stackheight(stats[1])'>
      <p> {{ stats[1] }} </p>
      <p> {{ strings.wrong[appLanguage] }} </p>
    </div>
    <div :class='stackheight(stats[2])'> 
      <p> {{ stats[2] }} </p>
      <p> {{ strings.right[appLanguage] }} </p>
    </div>
    <div :class='stackheight(stats[3])'> 
      <p> {{ stats[3] }} </p>
      <p> {{ strings.done[appLanguage] }} </p>
    </div>
  </div>
</template>

<script setup>

  const props = defineProps(['stats', 'appLanguage'])

  const strings = {
    start: {
      en: 'start',
      es: 'inicio',
      nl: 'start'
    },
    wrong: {
      en: 'wrong',
      es: 'error',
      nl: 'fout'
    },
    right: {
      en: 'right',
      es: 'correct',
      nl: 'goed'
    },
    done: {
      en: 'done',
      es: 'hecho',
      nl: 'klaar'
    }
  }

  function stackheight (deck) {
    const total = props.stats[0] + props.stats[1] + props.stats[2] + props.stats[3]
    const factor = deck / total
    if (factor >= 1) {
      return 'hundred'
    } else if (factor >= 0.9) {
      return 'ninety'
    } else if (factor >= 0.8) {
      return 'eighty'
    } else if (factor >= 0.7) {
      return 'seventy'
    } else if (factor >= 0.6) {
      return 'sixty'
    } else if (factor >= 0.5) {
      return 'fifty'
    } else if (factor >= 0.4) {
      return 'fourty'
    } else if (factor >= 0.3) {
      return 'thirty'
    } else if (factor >= 0.2) {
      return 'twenty'
    } else if (factor >= 0.1) {
      return 'ten'
    } else {
      return 'zero'
    }
  }

</script>


<style>
.stats {
  width: 15em;
  height: 5em;
  margin: 0em auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.stats div {
  background-color: #fff;
  width: 22.5%;
  padding: .5em 0;
  border: 2px solid #11d4ff;
  border-radius: 5px;
  text-align: center;
  transition: all .3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.stats p {
  margin: 0;
}

.hundred {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc, 4px 4px 0px #eee, 5px 5px 0px #ccc, 6px 6px 0px #eee, 7px 7px 0px #ccc, 8px 8px 0px #eee, 9px 9px 0px #ccc, 10px 10px 0px #eee;
  transform: translateX(-10px) translateY(-10px);
}

.ninety {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc, 4px 4px 0px #eee, 5px 5px 0px #ccc, 6px 6px 0px #eee, 7px 7px 0px #ccc, 8px 8px 0px #eee, 9px 9px 0px #ccc;
  transform: translateX(-9px) translateY(-9px);
}

.eighty {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc, 4px 4px 0px #eee, 5px 5px 0px #ccc, 6px 6px 0px #eee, 7px 7px 0px #ccc, 8px 8px 0px #eee;
  transform: translateX(-8px) translateY(-8px);
}

.seventy {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc, 4px 4px 0px #eee, 5px 5px 0px #ccc, 6px 6px 0px #eee, 7px 7px 0px #ccc;
  transform: translateX(-7px) translateY(-7px);
}

.sixty {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc, 4px 4px 0px #eee, 5px 5px 0px #ccc, 6px 6px 0px #eee;
  transform: translateX(-6px) translateY(-6px);
}

.fifty {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc, 4px 4px 0px #eee, 5px 5px 0px #ccc;
  transform: translateX(-5px) translateY(-5px);
}

.fourty {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc, 4px 4px 0px #eee;
  transform: translateX(-4px) translateY(-4px);
}

.thirty {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee, 3px 3px 0px #ccc;
  transform: translateX(-3px) translateY(-3px);
}

.twenty {
  box-shadow: 1px 1px 0px #ccc, 2px 2px 0px #eee;
  transform: translateX(-0px) translateY(-0px);
}

.ten {
  box-shadow: 1px 1px 0px #ccc;
  transform: translateX(-1px) translateY(-1px);
}

.zero {
  background-color: rgba(248,248,248,1);
}
</style>