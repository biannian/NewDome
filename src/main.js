// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Alert } from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css


// 全局路由守卫 拦截所有路由
// router.beforeEach((to, from, next) => {
//   var token = sessionStorage["token"];
//   // 有token
//   if (token) {
//           // 直接放行
//           next();
//   }
//   else {  // 否则是没有
//     // 如果去的是登录页
//     if (to.path === '/' | to.path === '/register') {
//       // 直接放行
//       next();
//     } else {
//       // 如果去的是其他页,跳转到登录页
//       //alert("登陆失败，请重新登录");
//       // 跳转到登录页
//       return next({ "path": "/" })
//     }
//   }
// })

Vue.use(ElementUI) //使用elementUI
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
