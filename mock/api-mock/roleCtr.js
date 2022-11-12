const Mock = require('mockjs')

const { roleList } = Mock.mock({
  roleList: [
    {
      role: 'super-admin',
      description: '超级管理员'
    },
    {
      role: 'root',
      description: '普通管理员（可以进行菜单管理：模管）'
    },
    {
      role: 'oj-admin',
      description: 'oj管理员（负责oj相关模块）'
    },
    {
      role: 'teacher',
      description: '教师用户（负责教学相关模块）'
    },
    {
      role: 'user',
      description: '普通用户（目前仅可查看首页，后期普通用户可能不能进入后台管理）'
    }
  ]
})

module.exports = [
  // 角色列表请求处理
  {
    url: '/roles/roleList',
    type: 'get',
    response: (config) => {
      const { page, size } = config.query
      const newsList = roleList.filter(
        (item, index) => index < size * page && index >= size * (page - 1)
      )

      return {
        code: 200,
        msg: '获取列表成功！',
        data: newsList,
        total: roleList.length
      }
    }
  }
]
