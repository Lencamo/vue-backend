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

/**
 * 根据角色id获取不同的菜单列表
 * @returns
 */
export function getMenuByRoleIdFn(id) {
  return request({
    // url: `/menu/getMenuByRoleId/${id}`,
    url: '/menu/getMenuByRoleId',
    method: 'post',
    data: {
      id
    }
  })
}
