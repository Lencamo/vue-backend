import request from '@/utils/request'

/**
 * 用户登录接口
 * @param {} data {email: 邮箱, password: 密码}
 * @returns
 */
export function loginAPI(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * 根据token获取用户信息接口
 * @param {*} tokenValue token值
 * @returns
 */
export function getUserInfoAllAPI(tokenValue) {
  // const url = '/user/info/all/token/' +
  // console.log(url)
  return request({
    url: `/user/info/all/token/${tokenValue}`,
    method: 'get'
  })
}

/**
 * 获取用户列表
 * @returns
 */
export function getUserListAllAPI() {
  // const url = '/user/info/all/token/' +
  // console.log(url)
  return request({
    url: '/user/userList',
    method: 'get'
  })
}
