import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import store from './store'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login', '/404'] // no redirect whitelist

// 1、前置路由守卫
router.beforeEach((to, from, next) => {
  // 显示进度条
  NProgress.start()

  const token = store.getters.token

  if (token) {
    // 有token进后台
    if (to.path === '/login') {
      NProgress.done()
      // (token风险防范)
      next('/')
    } else {
      next()
      // (初始化页面时发起的请求)
      if (!store.getters.name) {
        store.dispatch('user/getUserInfoAllActions')
      }
    }
  } else {
    // 没token进登录页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 跳转到登录页面（升级：未遂地址处理 --- token过期时）
      // next('/login')
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)

      NProgress.done()
    }
  }
})

// 2、后置路由守卫
router.afterEach((to, from) => {
  // 动态展示浏览器头部标题
  // console.log(to.meta.title)
  document.title = getPageTitle(to.meta.title)
  // 隐藏进度条
  NProgress.done()
})
