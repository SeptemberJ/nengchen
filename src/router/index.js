import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import Login from '@/pages/Login'
import SetPsd from '@/pages/SetPsd'
import Information from '@/pages/Information'
import Home from '@/pages/Home'
import {getCookie} from '@/util/utils'
// import Print from '@/pages/Print'
// import Excel from '@/pages/Excel2'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/SetPsd',
      name: 'SetPsd',
      component: SetPsd,
      meta: {requireAuth: true}
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information,
      meta: {requireAuth: true}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: true}
    },
    // {
    //   path: '/Print',
    //   name: 'Print',
    //   component: Print,
    //   meta: {requireAuth: false}
    // },
    // {
    //   path: '/Excel',
    //   name: 'Excel',
    //   component: Excel,
    //   meta: {requireAuth: false}
    // },
    {path: '*', redirect: '/Login'}
  ]
})

// 登录控制
router.beforeEach((to, from, next) => {
  store.dispatch('changePath', to.name)
  if (to.meta.requireAuth) {
    if (getCookie('Fs_14a808c40bba58c2c')) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  store.dispatch('changePath', to.name)
})
export default router
