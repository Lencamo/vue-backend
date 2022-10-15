import Layout from '@/layout'

export default {
  path: '/other',
  component: Layout,
  children: [
    {
      path: 'other',
      name: 'other',
      component: () => import('@/views/others'),
      meta: { title: '其他模块', icon: 'nested' }
    }
  ]
}
