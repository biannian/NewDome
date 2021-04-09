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
import sellerShopEdit from '@/components/seller/sellerShopEdit'
import personalAddress from '@/components/buyer/personalAddress'
import chat from '@/components/buyer/chat'
import order from '@/components/buyer/order'
import informationEdit from '@/components/buyer/informationEdit'
import sellerIndex from '@/components/seller/sellerIndex'
import sellerOrder from '@/components/seller/sellerOrder'
import sellerAccountEdit from '@/components/seller/sellerAccountEdit'
import sellerOrderList from '@/components/seller/sellerOrderList'


import sellerOrderEdit from '@/components/seller/sellerOrderEdit'
import cancelEdit from '@/components/seller/cancelEdit'
import sellerInformation from '@/components/seller/sellerInformation'
import chatList from '@/components/seller/chatList'
import sellerCommodityEdit from '@/components/seller/sellerCommodityEdit'
import sellerCommodityAdd from '@/components/seller/sellerCommodityAdd'
import sellerCommodityList from '@/components/seller/sellerCommodityList'

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
    path: '/seller/sellerShopEdit',
    name: 'sellerShopEdit',
    component: sellerShopEdit,
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
  }, {
    path: '/seller/sellerIndex',
    name: 'sellerIndex',
    component: sellerIndex,
  }, {
    path: '/seller/sellerOrder',
    name: 'sellerOrder',
    component: sellerOrder,
  }, {
    path: '/seller/sellerAccountEdit',
    name: 'sellerAccountEdit',
    component: sellerAccountEdit,
  }, {
    path: '/seller/sellerOrderList',
    name: 'sellerOrderList',
    component: sellerOrderList,
  }
  , {
    path: '/seller/sellerOrderEdit',
    name: 'sellerOrderEdit',
    component: sellerOrderEdit,
  }
  , {
    path: '/seller/sellerCommodityAdd',
    name: 'sellerCommodityAdd',
    component: sellerCommodityAdd,
  }, {
    path: '/seller/sellerCommodityList',
    name: 'sellerCommodityList',
    component: sellerCommodityList,
  }
  , {
    path: '/seller/sellerCommodityEdit',
    name: 'sellerCommodityEdit',
    component: sellerCommodityEdit,
  } ,
  {
    path: '/seller/cancelEdit',
    name: 'cancelEdit',
    component: cancelEdit,
  } ,
  {
    path: '/seller/chatList',
    name: 'chatList',
    component: chatList,
  } , {
    path: '/seller/sellerInformation',
    name: 'sellerInformation',
    component: sellerInformation,
  }
]
const router = new Router({
  routes
})
export default router
