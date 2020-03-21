/*jshint esversion: 6 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { 
        token: "lol"
    },
    mutations: {
        setToken: (state, string) => {
            state.token = string;
        },
        clearToken: (state) => {
            state.token = null;
        },
    }
});