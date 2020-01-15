import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import Message from "vue-m-message";
Vue.use(Message, { name: "msg" });
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import kityminder from "vue-kityminder-gg";
Vue.use(kityminder);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
