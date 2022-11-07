import Layout from '@/layout'

export default {
  path: '/power',
  component: Layout, // 保持Layout架子渲染
  alwaysShow: true, // 当children只有一个时，显示根路由
  meta: { title: '权限管理', icon: 'form', roles: ['super-admin', 'root'] },
  children: [
    {
      path: 'userControl',
      name: 'userControl',
      component: () => import('@/views/power/userControl'),
      meta: { title: '用户管理', icon: 'user', roles: ['super-admin', 'root'] }
    },
    {
      path: 'roleControl',
      name: 'roleControl',
      component: () => import('@/views/power/roleControl'),
      meta: { title: '角色管理', icon: 'nested', roles: ['super-admin', 'root'] }
    },
    {
      path: 'menuControl',
      name: 'menuControl',
      component: () => import('@/views/power/menuControl'),
      meta: { title: '菜单管理', icon: 'example', roles: ['super-admin'] }
    }
  ]
}
