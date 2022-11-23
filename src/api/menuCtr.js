import request from '@/utils/request'

/**
 * 获取菜单列表
 * @returns
 */
export function getMenuListAllAPI() {
  return request({
    url: '/menu/getMenuAllList',
    method: 'get'
  })
}
