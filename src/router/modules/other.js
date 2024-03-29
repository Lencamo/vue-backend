import Layout from '@/layout'

export default {
  path: '/other',
  component: Layout,
  meta: { title: '其他模块', icon: 'form', roles: ['super-admin', 'root'] },
  children: [
    {
      path: 'other',
      name: 'other',
      component: () => import('@/views/others'),
      meta: { title: '其他模块', icon: 'nested', role: ['super-admin', 'root'] }
    }
  ]
}
