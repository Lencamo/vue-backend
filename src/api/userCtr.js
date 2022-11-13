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
