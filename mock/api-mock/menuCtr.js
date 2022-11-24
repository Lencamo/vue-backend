const Mock = require('mockjs')

const { menuList } = Mock.mock({
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

  super_adminIds: [1, 11, 12, 13, 2, 21, 22, 3, 31],
  rootIds: [1, 12, 13],
  oj_adminIds: [],
  teacherIds: [1, 11, 2, 21, 22, 3, 31],
  userIds: [1, 11, 12, 13, 2, 21, 22, 3, 31]
})

module.exports = [
  // 获取菜单列表
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
  }
]
