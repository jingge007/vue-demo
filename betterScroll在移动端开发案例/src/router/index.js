import Vue from 'vue'
import Router from 'vue-router'
import Crossscreen from '../components/Cross-screen.vue'
import Mobilescreen from '../components/Mobile-screen.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/Cross-screen', component: Crossscreen},
    {path: '/Cross-screen', component: Crossscreen},       // 横屏
    {path: '/Mobile-screen', component: Mobilescreen}  // 手机的轮播图
  ]
})
