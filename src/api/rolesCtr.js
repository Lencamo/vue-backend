import request from '@/utils/request'

/**
 * 分页获取角色列表
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

/**
 * 删除角色
 * @returns
 */
export function delRoleAPI(id) {
  return request({
    // url: `/roles/delRole/${id}`,
    // method: 'delete'
    url: '/roles/delRole',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 获取某个角色信息
 * @returns
 */
export function getRoleDetailAPI(id) {
  return request({
    url: '/roles/getRoleDetail',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 编辑某个角色信息
 * @returns
 */
export function editRoleAPI(data) {
  return request({
    url: '/roles/editRole',
    method: 'post',
    data
  })
}

/**
 * 获取角色列表
 * @returns
 */
export function getRoleListAPI() {
  return request({
    url: '/roles/getRoles',
    method: 'get'
  })
}
