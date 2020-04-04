/*jshint esversion: 6 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem("user")) || {
      username: null,
      password: null,
    },
    token: sessionStorage.getItem("token") || null,
    currentProject: null,
    refresh: false,
    selectedTab: "instances",
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    clearToken: (state) => {
      state.token = null;
      sessionStorage.removeItem("token");
    },
    setUser: (state, user) => {
      state.user = user;

      sessionStorage.setItem("user", JSON.stringify(user));
    },
    clearUser: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
    setCurrentProject: (state, project) => {
      state.currentProject = project;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    refreshPage: (state) => {
      if (state.refresh == false) {
        state.refresh = true;
      } else {
        state.refresh = false;
      }
    },
    setSelectedTab: (state, tab) => {
      state.selectedTab = tab;
    },
  },
});
