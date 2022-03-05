import { createApp } from 'vue';
// 引入路由配置
import router from './router/index';
// import axios from './utils/axios.js';

import App from './App.vue';

import './scss/custom.scss';

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'jquery';
import 'bootstrap';

import veeValidate from './plugins/vee-validate';

const app = createApp(App);

// app.config.globalProperties.$axios = axios;

app.use(VueLoading);
app.use(veeValidate);

app.use(router);

app.mount('#app');
