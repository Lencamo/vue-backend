import Layout from '@/layout'

export default {
  path: '/teaching',
  component: Layout, // 保持Layout架子渲染
  alwaysShow: true, // 当children只有一个时，显示根路由
  meta: { title: '教学管理', icon: 'form', roles: ['super-admin', 'root', 'teacher'] },
  children: [
    {
      path: 'classSide',
      name: 'classSide',
      component: () => import('@/views/teaching/classSide'),
      meta: { title: '班级管理', icon: 'example', roles: ['super-admin', 'teacher'] }
    },
    {
      path: 'teacherSide',
      name: 'teacherSide',
      component: () => import('@/views/teaching/teacherSide'),
      meta: { title: '教师管理', icon: 'user', roles: ['super-admin', 'root'] }
    }
  ]
}
