import Vue from 'vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue';

import store from './store/auth';

import axios from 'axios'
import VueAxios from 'vue-axios';

axios.defaults.baseURL = "http://devstack.local";
 
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue, IconsPlugin)

Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
