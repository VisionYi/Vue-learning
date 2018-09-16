// webpack 有另外引入全局的 .scss 檔案，為了讓 .vue 檔案直接使用變數，設定請看 build/utils.js

import 'vuetify/dist/vuetify.min.css';
import '@/assets/grid-system.min.css';
import '@/assets/dev-fast-layout.css';
import '@/assets/scss/main.scss';

// Import Dependency
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store/index';
import components from './components/index';
import { objectForEach } from './shared/util';

Vue.use(Vuetify, {
  theme: {
    primary: '#00B8D4',
    error: '#E30041',
    warning: '#E36A00',
    success: '#00C54B',
  },
});

objectForEach(components, (value, key) => {
  Vue.component(key, value);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
