import { loginAPI } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

import router from '../../router'

const getDefaultState = () => {
  return {
    token: getToken(), // vuex存储的是cookie中的token
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 1、设置token
  SET_TOKEN: (state, token) => {
    state.token = token
    // 持久化存储token
    setToken(token)
  },
  // 2、删除token
  REMOVE_TOKEN: (state, token) => {
    state.token = ''
    removeToken()
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
