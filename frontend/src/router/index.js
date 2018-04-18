import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Server from '@/components/Server'
import 'semantic-ui-css/semantic.min.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/server',
      name: 'Server',
      component: Server
    }
  ]
})
