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
      description:
        '普通用户（目前给予他了super-admin所拥有的权限，后期普通用户可能不能进入后台管理）'
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
  },

  // 添加角色请求处理
  {
    url: '/roles/addRole',
    type: 'post',
    response: (config) => {
      const { name, description } = config.body
      roleList.push({
        role: name,
        description: description
      })

      return {
        code: 200,
        msg: '添加角色成功！',
        data: roleList,
        total: roleList.length
      }
    }
  },

  // 删除角色请求处理
  {
    // url: /\/roles\/delRole/,
    // type: 'delete',
    url: '/roles/delRole',
    type: 'post',
    response: (config) => {
      // const { id } = config.params
      const { id } = config.body

      const index = roleList.findIndex((item) => item.id === id)
      roleList.splice(index, 1)

      return {
        code: 200,
        msg: '删除角色成功！',
        data: roleList,
        total: roleList.length
      }
    }
  },

  // 获取某个角色信息请求处理
  {
    url: '/roles/getRoleDetail',
    type: 'post',
    response: (config) => {
      const { id } = config.body

      const roleDetail = roleList.slice(id, id + 1)

      return {
        code: 200,
        msg: '获取角色信息成功！',
        data: roleDetail,
        total: roleList.length
      }
    }
  },

  // 编辑某个角色信息请求处理
  {
    url: '/roles/editRole',
    type: 'post',
    response: (config) => {
      const { id, roleForm } = config.body

      const roleObj = []
      roleObj.push({
        role: roleForm.name,
        description: roleForm.description
      })
      // roleObj.role = roleForm.name
      // roleObj.description = roleForm.description

      const roleDetail = roleList.splice(id, 1, roleObj[0])

      return {
        code: 200,
        msg: '更改角色信息成功！',
        data: roleDetail,
        total: roleList.length
      }
    }
  },

  // 获取角色列表请求处理
  {
    url: '/roles/getRoles',
    type: 'get',
    response: (config) => {
      const roles = roleList.map((item) => {
        return item.role
      })

      return {
        code: 200,
        msg: '更改角色信息成功！',
        data: roles,
        total: roleList.length
      }
    }
  }
]
