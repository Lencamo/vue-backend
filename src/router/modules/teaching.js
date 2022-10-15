import Layout from '@/layout'

export default {
  path: '/teaching',
  component: Layout, // 保持Layout架子渲染
  meta: { title: '教学管理', icon: 'form' },
  children: [
    {
      path: 'classSide',
      name: 'classSide',
      component: () => import('@/views/teaching/classSide'),
      meta: { title: '班级管理', icon: 'example' }
    },
    {
      path: 'teacherSide',
      name: 'teacherSide',
      component: () => import('@/views/teaching/teacherSide'),
      meta: { title: '教师管理', icon: 'user' }
    },
    {
      path: 'roleSide',
      name: 'roleSide',
      component: () => import('@/views/teaching/roleSide'),
      meta: { title: '角色管理', icon: 'nested' }
    }
  ]
}
