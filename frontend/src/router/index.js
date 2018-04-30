import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Server from '@/components/Server';
import PageNotFound from '@/components/PageNotFound';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/server/:id',
      name: 'Server',
      component: Server,
    }, {
      path: '/*',
      name: 'Page not found',
      component: PageNotFound,
    },
  ],
});
