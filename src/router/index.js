import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '@/views/layout/index'
import Login from '@/views/login/index'
import MyOrder from '@/views/myorder/index'
import Pay from '@/views/pay/index'
import ProDetail from '@/views/prodetail/index'
import Search from '@/views/search/index'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import Home from '@/views/layout/home'
import User from '@/views/layout/user'
import List from '@/views/search/list'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: LayOut,
      redirect: '/home',
      children: [
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/home', component: Home },
        { path: '/user', component: User },
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/list', component: List }
  ]

})

// 所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // 非权限页面，直接放行
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 是权限页面，需要判断token
  //这里不能用$store
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router 
