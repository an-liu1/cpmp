import Vue from "vue";
import Vuex from "vuex";
import request from "./requst";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    status: "",
    minderData: {},
    minderChartBack: {},
    allMinderData: [],
    exampleMinder: []
  },
  mutations: {
    logInResponse(state, payload) {
      state.message = payload.data;
      state.status = payload.status;
    },
    resetMinder(state) {
      state.minderChartBack = {};
    },
    getMinder(state, payload) {
      state.minderData = payload;
    },
    getAllMinders(state, payload) {
      state.allMinderData = payload;
    },
    setMinderBcak(state, payload) {
      state.minderChartBack = payload;
    },
    getExampleMinder(state, payload) {
      state.exampleMinder = payload;
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
    async getExampleMinderChart({ commit }) {
      let res = await request("get", `minder/minderGetExample`);
      commit("getExampleMinder", res.data);
    },
    async setMinderChart({ commit }, data) {
      let res = await request("post", "minder/minderSet", data);
      commit("setMinderBcak", res.data);
    },
    async updateMinderChart({ commit }, data) {
      let res = await request(
        "put",
        `minder/minderUpdate/${data.minderId}`,
        data
      );
      commit("setMinderBcak", res.data);
    },
    async getMinderChart({ commit }, data) {
      let res = await request("get", `minder/minderGet/${data}`);
      commit("getMinder", res.data[0]);
    },
    async deleteMinderChart(context, data) {
      await request("delete", `minder/minderDelete/${data}`);
    },
    async getAllMinders({ commit }) {
      let res = await request("get", "minder/minderGetAll");
      commit("getAllMinders", res.data);
    }
  },
  modules: {}
});
