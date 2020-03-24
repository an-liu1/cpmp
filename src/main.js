import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Message from "vue-m-message";
Vue.use(Message, { name: "msg" });
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import kityminder from "vue-kityminder-gg";
Vue.use(kityminder);
import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to,from,next) => {
  const role = localStorage.getItem("Authorization");
  // if (!to.matched.some(route => route.meta.permission)) {
    if (!role && to.path !== "/login") {
      next("/login");
    } else {
      if (to.path !== "/dashboard") {
        store.commit("isShowStep");
        next()
      } else {
        store.commit("noShowStep");
        next()
      }
      // next();
    }
  // } else {
  //   next();
  // }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
