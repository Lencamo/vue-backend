import store from '@/store'
import axios from 'axios'

// 引入element-ui弹窗
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 请求头携带token
    const token = store.getters.token
    if (token) {
      config.headers['X-token'] = `Bearer ${token}`
    }

    // 应开发规范要求
    config.headers['Content-Type'] = 'application/json'

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axios响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response.data)
    const { code, data } = response.data
    if (code === 200) {
      return response
    } else {
      // 弹窗提示
      Message.error(data.message)
      return Promise.reject(error)
    }
    // return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
