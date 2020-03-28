import Vue from 'vue';
import App from './App.vue';

import store from './store/auth';

import axios from 'axios'
import VueAxios from 'vue-axios';

axios.defaults.baseURL = "http://192.168.93.10";
 
Vue.use(VueAxios, axios)

Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
