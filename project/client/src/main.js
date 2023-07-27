import './assets/main.css'

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import LoginForm from './components/LoginForm.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')