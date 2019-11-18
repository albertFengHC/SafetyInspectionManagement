import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {LoginUrl} from './../src/urlBase';

Vue.config.productionTip = false;

Vue.prototype.$LoginUrl=LoginUrl;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
