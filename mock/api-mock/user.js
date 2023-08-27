const Mock = require('mockjs')

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiOGZlNGUyMzAxMDIxNDMzYThlMTk1M2RhOTIwMWMyNmQiLCJpYXQiOjE2NjUxMzM1MjcsImV4cCI6MTY2NjM0MzEyN30.XlapA40qzy1czIXzRjBKdPXrW8pn-OzDeiu_3HxQYDg'

const { userInfo } = Mock.mock({
  userInfo: {
    role: ['user'],
    name: '@cname()',
    classes: '软件@string(number,1,2).@string(number,1,2)本',
    studentId: '@id()',
    email: '',
    uuid: '@guid()'
  }
})

module.exports = [
  // 用户登录接口 ✔
  {
    url: '/user/login',
    type: 'post',
    response: (config) => {
      // console.log(config.body)
      const { email, password } = config.body

      userInfo.email = email

      // console.log(userInfo)
      switch (email) {
        case '11111111@qq.com':
          userInfo.role[0] = 'super-admin'
          break
        case '22222222@qq.com':
          userInfo.role[0] = 'root'
          break
        case '33333333@qq.com':
          userInfo.role[0] = 'oj-admin'
          break
        case '44444444@qq.com':
          userInfo.role[0] = 'teacher'
          break
        default:
          userInfo.role[0] = 'user'
          break
      }

      // console.log(userInfo)
      return {
        code: 200,
        msg: '登录成功',
        data: {
          message: 'success',
          token: TOKEN
        }
      }
    }
  },

  // 根据token获取用户信息接口 ✔
  {
    url: '/user/info/all',
    type: 'post',
    response: (config) => {
      const { tokenValue } = config.body
      console.log(tokenValue)

      if (tokenValue === TOKEN) {
        return {
          code: 200,
          msg: '查询成功！',
          data: userInfo
        }
      } else {
        return {
          code: 500,
          data: {
            message: 'Not Authenticated'
          },
          msg: '用户认证错误！'
        }
      }
    }
  }
]
