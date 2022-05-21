import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Maska from 'maska'

library.add(fas)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(Maska)
  .use(store)
  .use(router)
  .mount('#app')
