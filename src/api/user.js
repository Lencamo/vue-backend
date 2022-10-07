import request from '@/utils/request'

export function loginAPI(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
