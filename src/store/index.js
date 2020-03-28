import Vue from "vue";
import Vuex from "vuex";
import request from "./requst";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    status: "",
    minderData: {},
    minderChartId: "",
    allMinderData: [],
    exampleMinder: []
  },
  mutations: {
    logInResponse(state, payload) {
      state.message = payload.data;
      state.status = payload.status;
    },
    getMinder(state, payload) {
      state.minderData = payload;
    },
    getAllMinders(state, payload) {
      state.allMinderData = payload;
    },
    getMinderChartId(state, payload) {
      state.minderChartId = payload._id;
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
    async getMinderChart({ commit }, data) {
      try {
        let res = await request(
          "get",
          `minder/minderGet/${data.minderName}/${data.projectName}`
        );
        commit("getMinder", res[0]);
      } catch (err) {
        commit("getMinder", err[0]);
      }
    },
    async getExampleMinderChart({ commit }, data) {
      try {
        let res = await request(
          "get",
          `minder/minderGetExample/${data.minderName}/${data.projectName}`
        );
        commit("getExampleMinder", res);
      } catch (err) {
        commit("getExampleMinder", err);
      }
    },
    async setMinderChart({ commit }, data) {
      try {
        let res = await request("post", "minder/minderSet", data);
        commit("getMinderChartId", res);
      } catch (err) {
        commit("getMinderChartId", err);
      }
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
          commit("getAllMinders", res);
        })
        .catch(err => {
          commit("getAllMinders", err);
        });
    }
  },
  modules: {}
});
