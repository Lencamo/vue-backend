import request from '@/utils/request'

/**
 * 用户登录接口
 * @param {} data {email: 邮箱, password: 密码}
 * @returns
 */
export function loginAPI(data) {
  return request({
    // url: 'http://127.0.0.1:4523/m1/1713872-0-default/user/login',
    // url: 'http://10.22.130.17:30892/user/login',
    // url: 'http://10.22.130.17/api/user/login',
    // url: 'http://eaip.com/api/user/login',
    // method: 'post',
    // data

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
    // url: `http://127.0.0.1:4523/m1/1713872-0-default/user/info/all/token/${tokenValue}`,
    // url: `http://10.22.130.17:30892/user/info/all/token/${tokenValue}`,
    // url: `http://10.22.130.17/api/user/info/all/token/${tokenValue}`,
    // url: `http://eaip.com/api/user/info/all/token/${tokenValue}`,
    // url: 'http://eaip.com/api/user/info/all/token/' + tokenValue,
    // method: 'get'

    url: '/user/info/all',
    method: 'post',
    data: { tokenValue }
  })
}
