import Vue from 'vue';
import App from './App.vue';
import './rpf/vue/vconsole';
import 'normalize.css';
import router from './router';
import store from './store';

import 'normalize.css';
import '@/styles/common.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
