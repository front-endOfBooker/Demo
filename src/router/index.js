import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home'
import Todos from '@/view/Todos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos
    }
  ]
})
