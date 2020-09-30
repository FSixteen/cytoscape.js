import Vue from 'vue/dist/vue.esm.js';

Vue.config.productionTip = false;

import App from './App.vue';
import router from './router/index';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

import Router from 'vue-router';

Vue.use(Router);

new Vue({router: router, render: h => h(App)}).$mount('#app')
