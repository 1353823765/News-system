import axios from "axios";
import { isLoading } from "../redux/constants/constant";
import {store} from "../redux/store";
axios.defaults.baseURL = "http://localhost:5000";
axios.interceptors.request.use(
  function (config) {
    store.dispatch({
      type: isLoading,
      pyload: true,
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    store.dispatch({
      type: isLoading,
      pyload: false,
    });
    return response;
  },
  function (error) {
    store.dispatch({
      type: isLoading,
      pyload: false,
    });
    return Promise.reject(error);
  }
);
