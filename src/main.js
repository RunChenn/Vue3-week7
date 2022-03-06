import { createApp } from 'vue';
// 引入路由配置
import router from './router/index';
// import axios from './utils/axios.js';

import App from './App.vue';

import './scss/custom.scss';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'jquery';
import 'bootstrap';

import veeValidate from './plugins/vee-validate';
import { date, currency } from './plugins/filters';

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};

// app.provide('message', function () {
//   console.log('來自全域的 provide');
// });

app.component('Loading', Loading);

// app.use(Loading);
app.use(veeValidate);

app.use(router);

app.mount('#app');
