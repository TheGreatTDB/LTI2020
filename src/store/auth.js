/*jshint esversion: 6 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { 
        user: {
            username: null
        },
        token: sessionStorage.getItem('token') || null,
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token;
            sessionStorage.setItem('token', token);
            this.axios.defaults.headers['x-auth-token'] = token;
        },
        loadToken: (state) => {
            let aux = sessionStorage.getItem('token');
            if(aux){
                state.token = aux;
                this.axios.defaults.headers['x-auth-token'] = aux;
            }else {
                this.axios.defaults.headers['x-auth-token'] = undefined;
            }
        },
        clearToken: (state) => {
            state.token = null;
            sessionStorage.removeItem('token');
            this.axios.defaults.headers['x-auth-token'] = undefined;
        },
        setUser: (state, user) => {
            state.user = user;

            sessionStorage.setItem('user', JSON.stringify(user));
        },
        loadUser: (state) => {
            var aux = JSON.parse(sessionStorage.user);
            if(aux){
                state.user = aux;
            }
        },
        clearUser: (state) => {
            state.user = null;
            sessionStorage.removeItem('user');
        },
        
    }
});