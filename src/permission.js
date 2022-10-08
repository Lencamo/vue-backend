import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login', '/404'] // no redirect whitelist

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
    }
  } else {
    // 没token进登录页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 隐藏进度条
  NProgress.done()
})
