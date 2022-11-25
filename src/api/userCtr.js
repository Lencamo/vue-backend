import request from '@/utils/request'

/**
 * 获取所有用户列表
 * @returns
 */
export function getUserListAllAPI() {
  return request({
    url: '/user/userListAll',
    method: 'get'
  })
}

/**
 * 获取用户列表
 * @returns
 */
export function getUserListAPI(params) {
  return request({
    url: '/user/userList',
    method: 'get',
    params
  })
}

/**
 * 添加用户
 * @returns
 */
export function addUserAPI(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

/**
 * 删除用户
 * @returns
 */
export function delUserAPI(id) {
  return request({
    url: '/user/delUser',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 获取某个用户信息
 * @returns
 */
export function getUserDetailAPI(id) {
  return request({
    url: '/user/getUserDetail',
    method: 'post',
    data: {
      id
    }
  })
}

/**
 * 编辑某个用户信息
 * @returns
 */
export function editUserAPI(data) {
  return request({
    url: '/user/editUser',
    method: 'post',
    data
  })
}

/**
 * 更改用户角色信息
 * @returns
 */
export function userRoleChangeAPI(data) {
  return request({
    url: '/user/userRoleChange',
    method: 'post',
    data
  })
}

/**
 * 批量添加用户
 * @returns
 */
export function addUserMoreAPI(data) {
  return request({
    url: '/user/addUserMore',
    method: 'post',
    data
  })
}
