import axios from "axios";
import { throwErr } from "@/utils";
import store from "@/store";
import { mainDomain } from "@/MainAPI.js";

axios.defaults.headers["Content-Type"] = "application/json;charse=UTF-8";

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("Authorization")) {
      config.headers = {
        Accept: "application/json",
        Authorization: localStorage.getItem("Authorization")
      };
      // config.headers.Authorization = localStorage.getItem("Authorization");
    }
    config.timeout = 100 * 1000;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      store.dispatch("logInResponse", response.data);
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  error => {
    if (error && error.response) {
      store.dispatch("logInResponse", error.response);
      let res = {};
      res.code = error.response.status;
      res.msg = throwErr(error.response.status, error.response);
      return Promise.reject(res);
    }
    return Promise.reject(error);
  }
);

export default function request(method, address, data) {
  const url = `${mainDomain}${address}`;
  method = method.toLowerCase();
  if (method === "post") {
    return axios.post(url, data);
  } else if (method === "get") {
    return axios.get(url);
  } else if (method === "delete") {
    return axios.delete(url, data);
  } else if (method === "put") {
    return axios.put(url, data);
  }
}
