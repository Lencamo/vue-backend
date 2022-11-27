import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'

import store from './store'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login', '/404'] // no redirect whitelist

// 1、前置路由守卫
router.beforeEach(async(to, from, next) => {
  // 显示进度条
  NProgress.start()

  const token = store.getters.token

  if (token) {
    // 有token进后台
    if (to.path === '/login') {
      // (token风险防范)
      next('/')
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 有角色信息
      if (hasRoles) {
        next()
      } else {
        try {
          // 1、获取服务器返回的角色数组
          const { role } = await store.dispatch('user/getUserInfoAllActions')
          // console.log(role)

          // 2、动态添加路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', role)
          // console.log(accessRoutes)

          router.options.routes.push(...accessRoutes)
          router.addRoutes(accessRoutes)

          // console.log(router.options.routes)

          // 细节处理
          next({ ...to, replace: true })
        } catch (error) {
          // 退出登录
          await store.dispatch('user/logOutActions')

          Message.error(error || 'Has Error')
          next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
          NProgress.done()
        }
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
