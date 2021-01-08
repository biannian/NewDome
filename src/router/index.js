import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import register from '@/components/register'
import Helloword from '@/components/Helloword'
import NotFound from '@/components/NotFound'
Vue.use(Router)
export const routes = [
    {
      path: '/',
      name: '登录',
      component: Login
    }, {
      path: '/register',
      name: '注册',
      component: register
    }, {
      path: '/Helloword',
      name: '首页面',
      component: Helloword
    },{
      path: '/NotFound',
      name: '404 NotFound',
      component: NotFound
    }

  ]
  const router = new Router({
    routes
  })
  export default router
