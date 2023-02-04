import { createApp } from 'vue'
import App from './AppWrapper.vue'

import './assets/styles.css'

const ua = window.navigator.userAgent
const isIE = /MSIE|Trident/.test(ua)

if (isIE) { // IE specific code
  // IE does not support backface visibility hidden, extra class for IE styles.
  let body = document.getElementsByTagName('body')[0]
  body.classList.add('ie')
}

createApp(App).mount('#app')
