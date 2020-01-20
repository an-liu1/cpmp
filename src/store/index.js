import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showStep: false
  },
  getters: {
    active: () => {
      return localStorage.getItem("active");
    }
  },
  mutations: {
    isShowStep(state) {
      state.showStep = true;
    },
    noShowStep(state) {
      state.showStep = false;
    }
  },
  actions: {},
  modules: {}
});
