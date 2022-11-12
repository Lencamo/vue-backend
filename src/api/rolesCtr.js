import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns
 */
export function getRoleListAllAPI(params) {
  return request({
    url: '/roles/roleList',
    method: 'get',
    params
  })
}
