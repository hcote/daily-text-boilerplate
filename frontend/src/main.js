import Vue from 'vue'
import Nav from './components/Nav.vue'
import router from './components/router'
import store from './store/index.js'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(Nav)
}).$mount('#app')