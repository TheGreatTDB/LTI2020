import Vue from "vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Multiselect from "vue-multiselect";

import App from "./App.vue";

import Toasted from 'vue-toasted';

import store from "./store/auth";

import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://devstack.local";

Vue.use(VueAxios, axios);
Vue.component("multiselect", Multiselect);
Vue.use(BootstrapVue, IconsPlugin);
Vue.use(Toasted);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
