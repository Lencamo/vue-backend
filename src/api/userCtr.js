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
