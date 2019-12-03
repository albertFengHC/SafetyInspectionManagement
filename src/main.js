import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
