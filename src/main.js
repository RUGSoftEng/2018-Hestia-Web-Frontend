// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import 'vue-range-slider/dist/vue-range-slider.css';
import App from './App';
import router from './router';
import store from './store';
// eslint-disable-next-line
import 'auth0-js';
import '../semantic/dist/semantic.min.css';


Vue.use(SuiVue);
Vue.config.productionTip = false;


/* eslint-disable */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
