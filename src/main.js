// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const ua = window.navigator.userAgent
const isIE = /MSIE|Trident/.test(ua)

if (isIE) {
  // IE specific code goes here
  let body = document.getElementsByTagName('body')[0]
  body.classList.add('ie')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  template: '<App/>',
  components: { App }
})
