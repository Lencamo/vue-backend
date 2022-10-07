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
