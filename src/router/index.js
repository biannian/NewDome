import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import register from '@/components/register'
import Helloword from '@/components/buyer/Helloword'
import NotFound from '@/components/NotFound'
import shop from '@/components/buyer/shop'
import accountIndex from '@/components/root/accountIndex'
import commodityList from '@/components/root/commodityList'
import accountList from '@/components/root/accountList'
import sellerShopList from '@/components/seller/sellerShopList'
import personalAddress from '@/components/buyer/personalAddress'
import chat from '@/components/buyer/chat'
import order from '@/components/buyer/order'
import informationEdit from '@/components/buyer/informationEdit'


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
    path: '/buyer/Helloword',
    name: '首页面',
    component: Helloword,
  }, {
    path: '/NotFound',
    name: '404 NotFound',
    component: NotFound,
  }, {
    path: '/buyer/shop',
    name: 'shop',
    component: shop,
  }, {
    path: '/root/accountIndex',
    name: 'accountIndex',
    component: accountIndex,
  }, {
    path: '/root/commodityList',
    name: 'commodityList',
    component: commodityList,
  }, {
    path: '/root/accountList',
    name: 'accountList',
    component: accountList,
  }, {
    path: '/seller/sellerShopList',
    name: 'sellerShopList',
    component: sellerShopList,
  }, {
    path: '/buyer/personalAddress',
    name: 'personalAddress',
    component: personalAddress,
  }, {
    path: '/buyer/chat',
    name: 'chat',
    component: chat,
  }, {
    path: '/buyer/order',
    name: 'order',
    component: order,
  }, {
    path: '/buyer/informationEdit',
    name: 'informationEdit',
    component: informationEdit,
  }

]
const router = new Router({
  routes
})
export default router
