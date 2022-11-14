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
  // 用户列表请求处理
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
  },

  // 添加用户请求处理
  {
    url: '/roles/addUser',
    type: 'post',
    response: (config) => {
      const { role, name, classes, studentId, email } = config.body

      const newUser = Mock.mock({
        role: role,
        name: name,
        classes: classes ? classes : '空',
        studentId: studentId ? studentId : '空',
        email: email,
        uuid: '@guid()'
      })

      userList.push(newUser)

      return {
        code: 200,
        msg: '添加用户成功！',
        data: userList,
        total: userList.length
      }
    }
  },

  // 删除角色请求处理
  {
    url: '/roles/delUser',
    type: 'post',
    response: (config) => {
      // const { id } = config.params
      const { id } = config.body

      const index = userList.findIndex((item) => item.id === id)
      userList.splice(index, 1)

      return {
        code: 200,
        msg: '删除角色成功！',
        data: userList,
        total: userList.length
      }
    }
  }
]
