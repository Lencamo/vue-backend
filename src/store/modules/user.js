import { loginAPI, getUserInfoAllAPI } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

import router from '../../router'

const getDefaultState = () => {
  return {
    token: getToken(), // vuex存储的是cookie中的token
    userInfoAll: {}, // 存储根据token获取的用户信息
    name: '',
    avatar: ''

  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  // 1、token处理
  SET_TOKEN: (state, token) => {
    state.token = token
    // 持久化存储token
    setToken(token)
  },
  REMOVE_TOKEN: (state, token) => {
    state.token = ''
    removeToken()
  },

  // 2、学号处理
  SET_UserInfoAll: (state, infoObj) => {
    state.userInfoAll = infoObj
  },
  REMOVE_UserInfoAll: (state) => {
    state.userInfoAll = {}
  },

  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 登录接口封装
  async loginActions({ commit }, data) {
    const { data: res } = await loginAPI(data)
    // 存储token
    commit('SET_TOKEN', res.data.token)
    // 成功提示
    Message.success(res.msg)
    // 页面跳转到后台主页
    router.replace('/')
  },

  // 根据token获取用户信息接口
  async getUserInfoAllActions({ commit }) {
    const token = getToken()
    const { data: res } = await getUserInfoAllAPI(token)
    // console.log(res)
    // 存储信息
    commit('SET_UserInfoAll', res.data)
  },

  // 退出登录
  async logOutActions({ commit }) {
    commit('REMOVE_TOKEN')
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
