<template>
  <div>
    <svg viewBox='0 0 20 20' @click='$emit("changeView", "settings")' v-bind:class="{ active: view === 'settings' }">
        <title>settings</title>
        <circle cx="10" cy="10" r="9"/>
        <path d="m9 6.3164-1.6895 0.97656-1.9832-1.1497-1 1.7305 1.9872 1.1536 0.00195 1.9453-2.0103 1.1748 1 1.7305 2.0044-1.1709 1.6895 0.97461-5e-5 2.3183h2l5.3e-5 -2.3085 1.6973-0.98047 1.9754 1.1246 1-1.7305-1.9715-1.1226-2e-3 -1.9648 1.9735-1.1438-1-1.7305-1.9753 1.1458-1.6973-0.97852-1e-4 -2.3107h-2zm1 0.7774c1.6049 3.312e-4 2.9059 1.3013 2.9062 2.9062-3.31e-4 1.6049-1.3013 2.9059-2.9062 2.9062-1.6049-3.31e-4 -2.9059-1.3013-2.9062-2.9062 3.312e-4 -1.6049 1.3013-2.9059 2.9062-2.9062z"/>
      </svg>
      <svg viewBox='0 0 20 20' @click='$emit("changeView", "info")'  v-bind:class="{ active: view === 'info' }">
        <title>about</title>
        <circle cx="10" cy="10" r="9"/>
        <g>
          <path d="m10 8 v8"/>
          <circle cx="10" cy="4.5" r="0.5"/>
        </g>
      </svg>
      <svg viewBox='0 0 20 20' @click='$emit("changeView", "help")'  v-bind:class="{ active: view === 'help' }">
        <title>help</title>
        <circle cx="10" cy="10" r="9"/>
        <g v-bind:class="{ active: activeView === 'help' }">
          <path class="no-fill" d="m7 7c0-2 1-3 3-3s3 1 3 3-1 3-3 3v2"/>
          <circle cx="10" cy="15.5" r=".5"/>
       </g>
      </svg>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: ['view'],
  data () {
    return {
      activeView: ''
    }
  },
  created: function () {
    // this.activeView = this.view
  },
  methods: {
    toggleSettings: function () {
      this.$emit('changeView', 'settings')
    },
    toggleInfo: function () {
      this.$emit('changeView', 'info')
    },
    toggleHelp: function () {
      this.$emit('changeView', 'help')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 8em;
  height: 3em;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

div svg {
  width: 2em;
}

div circle {
  fill: #ddd;
}

div g, div path {
  fill: #bbb;
  stroke: #bbb;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.no-fill, .active .no-fill {
  fill:none;
}

.active circle {
  fill: #666;
}

.active g, .active path {
  stroke: #fff;
  fill: #fff;
}
</style>