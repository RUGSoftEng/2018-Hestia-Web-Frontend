import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Server from '@/components/Server';
import PageNotFound from '@/components/PageNotFound';
import Callback from '@/components/Callback';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    }, {
      path: '/server/:id',
      name: 'Server',
      component: Server,
    }, {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    }, {
      path: '/',
      redirect: '/Home',
    }, {
      path: '/*',
      name: 'Page not found',
      component: PageNotFound,
    },
  ],
});
