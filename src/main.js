import Vue from "vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Multiselect from "vue-multiselect";

import App from "./App.vue";

import Toasted from 'vue-toasted';

import store from "./store/auth";

import VueApexCharts from 'vue-apexcharts';

import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.baseURL = "http://134.122.49.176"; //"http://devstack.local"; //Mudar para ip do servidor do openstack! ex: "http://192.168.x.x"

Vue.use(VueAxios, axios);
Vue.component("multiselect", Multiselect);
Vue.use(BootstrapVue, IconsPlugin);
Vue.use(Toasted);
Vue.use(VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
