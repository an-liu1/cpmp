import Vue from "vue";
import Vuex from "vuex";
import request from "./requst";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    status: "",
    userInfo: {},
    minderData: {},
    minderChartBack: {},
    allMinderData: [],
    exampleMinder: [],
  },
  mutations: {
    logInResponse(state, payload) {
      state.message = payload.data;
      state.status = payload.status;
    },
    getUserInfo(state, payload) {
      state.userInfo = payload;
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
    },
  },
  actions: {
    async logInResponse({ commit }, data) {
      commit("logInResponse", data);
    },
    async login(context, data) {
      let res = await request("post", "freepmo/login", data);
      localStorage.setItem("Authorization", res.token);
    },
    async signup(context, data) {
      await request("post", "freepmo/register", data);
    },
    async requestReset(context, data) {
      await request("post", "freepmo/requestReset", data);
    },
    async resetPassword(context, data) {
      await request("post", "freepmo/resetPassword", data);
    },
    async getUserInfo({ commit }) {
      let res = await request("get", "freepmo/getUserInfo");
      commit("getUserInfo", res.data[0]);
    },
    async updateUserInfo(context, data) {
      await request("put", "freepmo/updateUserInfo", data);
    },
    async avatarUpload(context, data) {
      await request("post", "freepmo/avatarUpload", data);
    },
    async getExampleMinderChart({ commit }) {
      let res = await request("get", `freepmo/minderGetExample`);
      commit("getExampleMinder", res.data);
    },
    async setMinderChart({ commit }, data) {
      let res = await request("post", "freepmo/minderSet", data);
      commit("setMinderBcak", res.data);
    },
    async updateMinderChart({ commit }, data) {
      let res = await request(
        "put",
        `freepmo/minderUpdate/${data.minderId}`,
        data
      );
      commit("setMinderBcak", res.data);
    },
    async getMinderChart({ commit }, data) {
      let res = await request("get", `freepmo/minderGet/${data}`);
      commit("getMinder", res.data[0]);
    },
    async deleteMinderChart(context, data) {
      await request("delete", `freepmo/minderDelete/${data}`);
    },
    async getAllMinders({ commit }) {
      let res = await request("get", "freepmo/minderGetAll");
      commit("getAllMinders", res.data);
    },
  },
  modules: {},
});
