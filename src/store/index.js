import Vue from "vue";
import Vuex from "vuex";
import request from "./requst";
// import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    errMessage: "",
    status: "",
    showStep: false,
    minderData: {},
    allMinderData: []
  },
  getters: {
    active: () => {
      return localStorage.getItem("active");
    }
  },
  mutations: {
    logInResponse(state, payload) {
      state.message = payload.data;
      state.status = payload.status;
      // state.errMessage = payload.data.data.message;
    },
    isShowStep(state) {
      state.showStep = true;
    },
    noShowStep(state) {
      state.showStep = false;
    },
    getMInder(state, payload) {
      state.minderData = payload;
    },
    getAllMInders(state, payload) {
      state.allMinderData = payload;
    }
  },
  actions: {
    async logInResponse({ commit }, data) {
      commit("logInResponse", data);
    },
    async login(context, data) {
      let res = await request("post", "login", data);
      localStorage.setItem("Authorization", res.token);
    },
    async signup(context, data) {
      await request("post", "register", data);
    },
    // async getMinderChart({ commit }, data) {
    //   let res = await request("get", `minder/minderGet/${data}`);
    //   commit("getMInder", res);
    // },
    getMinderChart({ commit }, data) {
      let res = request("get", `minder/minderGet/${data}`);
      commit("getMInder", res[0]);
    },
    async setMinderChart(context, data) {
      await request("post", "minder/minderSet", data);
    },
    async updateMinderChart(context, data) {
      await request("post", `minder/minderUpdate/${data.minderId}`, data);
    },
    // getMinderChart({ commit }, data) {
    //   request("get", `minder/minderGet/${data}`)
    //     .then(res => {
    //       commit("getMInder", res[0]);
    //     })
    //     .catch(err => {
    //       commit("getMInder", err[0]);
    //     });
    // },
    getAllMinders({ commit }) {
      request("get", "minder/minderGetAll")
        .then(res => {
          commit("getAllMInders", res);
        })
        .catch(err => {
          commit("getAllMInders", err);
        });
    }
  },
  modules: {}
});
