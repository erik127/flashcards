import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const ua = window.navigator.userAgent
const isIE = /MSIE|Trident/.test(ua)

if (isIE) { // IE specific code
  // IE does not support backface visibility hidden, extra class for IE styles.
  let body = document.getElementsByTagName('body')[0]
  body.classList.add('ie')
}

new Vue({
  render: h => h(App),
}).$mount('#app')
