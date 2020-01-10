import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import kityminder from "vue-kityminder-gg";
Vue.use(kityminder);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
