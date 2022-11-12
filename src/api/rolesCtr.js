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

/**
 * 添加角色
 * @returns
 */
export function addRoleAPI(data) {
  return request({
    url: '/roles/addRole',
    method: 'post',
    data
  })
}