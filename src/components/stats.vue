<template>
  <div class="stats">
    <div :class='stackheight(deckStats[0])'> 
      <p>{{ deckStats[0] }}</p>
      <p>start</p>
    </div>
    <div :class='stackheight(deckStats[1])'>
      <p>{{ deckStats[1] }}</p>
      <p>wrong</p>
    </div>
    <div :class='stackheight(deckStats[2])'> 
      <p>{{ deckStats[2] }}</p>
      <p>right</p>
    </div>
    <div :class='stackheight(deckStats[3])'> 
      <p>{{ deckStats[3] }}</p>
      <p>done</p>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'stats',
  data () {
    return {

    }
  },
  props: ['deckStats'],
  methods: {
    stackheight: function (deck) {
      let total = this.deckStats[0] + this.deckStats[1] + this.deckStats[2] + this.deckStats[3]
      let factor = deck / total
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.float-right {
  float: right;
}

.stats {
  width: 15em;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.stats div {
  width: 20%;
  height: 10%;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  transition: all .3s ease-in-out;
}

.hundred {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb, 4px 4px 0px #bbb, 5px 5px 0px #bbb, 6px 6px 0px #bbb, 7px 7px 0px #bbb, 8px 8px 0px #bbb, 9px 9px 0px #bbb, 10px 10px 0px #bbb;
  transform: translateX(-10px) translateY(-10px);
}

.ninety {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb, 4px 4px 0px #bbb, 5px 5px 0px #bbb, 6px 6px 0px #bbb, 7px 7px 0px #bbb, 8px 8px 0px #bbb, 9px 9px 0px #bbb;
  transform: translateX(-9px) translateY(-9px);
}

.eighty {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb, 4px 4px 0px #bbb, 5px 5px 0px #bbb, 6px 6px 0px #bbb, 7px 7px 0px #bbb, 8px 8px 0px #bbb;
  transform: translateX(-8px) translateY(-8px);
}

.seventy {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb, 4px 4px 0px #bbb, 5px 5px 0px #bbb, 6px 6px 0px #bbb, 7px 7px 0px #bbb;
  transform: translateX(-7px) translateY(-7px);
}

.sixty {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb, 4px 4px 0px #bbb, 5px 5px 0px #bbb, 6px 6px 0px #bbb;
  transform: translateX(-6px) translateY(-6px);
}

.fifty {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb, 4px 4px 0px #bbb, 5px 5px 0px #bbb;
  transform: translateX(-5px) translateY(-5px);
}

.fourty {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb, 4px 4px 0px #bbb;
  transform: translateX(-4px) translateY(-4px);
}

.thirty {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb, 3px 3px 0px #bbb;
  transform: translateX(-3px) translateY(-3px);
}

.twenty {
  box-shadow: 1px 1px 0px #bbb, 2px 2px 0px #bbb;
  transform: translateX(-0px) translateY(-0px);
}

.ten {
  box-shadow: 1px 1px 0px #bbb;
  transform: translateX(-1px) translateY(-1px);
}

.zero {
  background-color: rgba(248,248,248,1);
}
</style>