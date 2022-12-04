import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';

import './assets/main.css';

const pinia = createPinia();
const app = createApp(App);

VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnReconnect: 'always',
        cacheTime: 60 * 1000,
      },
    },
  },
});

app.use(pinia);
app.use(router);

app.mount('#app');
