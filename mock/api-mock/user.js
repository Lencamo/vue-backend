const Mock = require('mockjs')

const { userList } = Mock.mock({
  'userList|35': [
    {
      'role|1': ['user', 'teacher', 'super-admin', 'root'],
      name: '@cname()',
      classes: '软件@string(number,1,2).@string(number,1,2)本',
      studentId: '@id()',
      email: '@email()',
      uuid: '@guid()'
    }
  ]
})

module.exports = [
  // 用户登录接口 ✔
  // 根据token获取用户信息接口 ✔

  // 用户登录请求处理
  {
    url: '/user/userList',
    type: 'get',
    response: (config) => {
      const { page, size } = config.query
      const newsList = userList.filter(
        (item, index) => index < size * page && index >= size * (page - 1)
      )

      return {
        code: 200,
        msg: '获取列表成功！',
        data: newsList,
        total: userList.length
      }
    }
  }
]
