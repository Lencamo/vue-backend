const Mock = require('mockjs')

const { menuList, super_adminIds, rootIds, oj_adminIds, teacherIds, userIds } = Mock.mock({
  menuList: [
    {
      id: 1,
      title: '权限管理',
      icon: 'form',
      roles: ['super-admin', 'root', 'teacher'],
      path: '/power',
      children: [
        {
          id: 11,
          title: '用户管理',
          icon: 'user',
          roles: ['super-admin', 'teacher'],
          path: 'userControl'
        },
        {
          id: 12,
          title: '角色管理',
          icon: 'nested',
          roles: ['super-admin', 'root'],
          path: 'roleControl'
        },
        {
          id: 13,
          title: '菜单管理',
          icon: 'example',
          roles: ['super-admin', 'root'],
          path: 'menuControl'
        }
      ]
    },
    {
      id: 2,
      title: '教学管理',
      icon: 'form',
      roles: ['super-admin', 'teacher'],
      path: '/teaching',
      children: [
        {
          id: 21,
          title: '班级管理',
          icon: 'example',
          roles: ['super-admin', 'teacher'],
          path: 'classSide'
        },
        {
          id: 22,
          title: '教师管理',
          icon: 'user',
          roles: ['super-admin', 'teacher'],
          path: 'teacherSide'
        }
      ]
    },
    {
      id: 3,
      title: '其他模块',
      icon: 'form',
      roles: ['super-admin', 'root', 'teacher'],
      path: '/other',
      children: [
        {
          id: 31,
          title: '其他模块',
          icon: 'nested',
          roles: ['super-admin', 'root', 'teacher'],
          path: 'other'
        }
      ]
    }
  ],

  // 角色和菜单表关联表（不能很好的模拟）
  super_adminIds: [1, 11, 12, 13, 2, 21, 22, 3, 31],
  rootIds: [1, 12, 13],
  oj_adminIds: [3, 31],
  teacherIds: [1, 11, 2, 21, 22, 3, 31],
  userIds: [1, 11, 12, 13, 2, 21, 22, 3, 31]
})

module.exports = [
  // 获取菜单列表请求处理
  {
    url: '/menu/getMenuAllList',
    type: 'get',
    response: (config) => {
      return {
        code: 200,
        msg: '获取列表成功！',
        data: menuList
      }
    }
  },

  // 根据角色id获取不同的菜单列表请求处理
  {
    url: '/menu/getMenuByRoleId',
    type: 'post',
    response: (config) => {
      const { id } = config.body
      console.log(id)

      var data

      if (id === 0) {
        data = super_adminIds
      } else if (id === 1) {
        data = rootIds
      } else if (id === 2) {
        data = oj_adminIds
      } else if (id === 3) {
        data = teacherIds
      } else if (id === 4) {
        data = userIds
      } else {
        data = []
      }

      return {
        code: 200,
        msg: '获取列表成功！',
        data: data
      }
    }
  }
]
