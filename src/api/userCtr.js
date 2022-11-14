import request from '@/utils/request'

/**
 * 获取用户列表
 * @returns
 */
export function getUserListAllAPI(params) {
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
    url: '/roles/addUser',
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
    url: '/roles/delUser',
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
    url: '/roles/getUserDetail',
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
    url: '/roles/editUser',
    method: 'post',
    data
  })
}
