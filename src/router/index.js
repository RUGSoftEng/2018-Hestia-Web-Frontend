import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Server from '@/components/Server';
import PageNotFound from '@/components/PageNotFound';
import Callback from '@/components/Callback';
import Login from '@/components/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
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
      path: '/callback',
      name: 'Callback',
      component: Callback,
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/*',
      name: 'Page not found',
      component: PageNotFound,
    },
  ],
});

/**
 * Check whether the current time is past the access token's expiry time.
 * @return {Boolean}
 */
// function isAuthenticated() {
//   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//   return new Date().getTime() < expiresAt;
// }

/*
 * Redirects the user to the login page if the user is not authenticated.
 */
// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && to.path !== '/callback') {
//     if (!isAuthenticated()) {
//       next('/login');
//     }
//   }
//   next();
// });

router.beforeEach((to, from, next) => {
  if (to.name === '/callback') { // check if "to"-route is "callback" and allow access
    next();
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next();
  } else { // trigger auth0 login
    router.app.$auth.login();
  }
});


export default router;
