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
      // config.headers['X-token'] = `Bearer ${token}`
      config.headers['X-token'] = `${token}`
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
    const { code, msg } = response.data
    if (code === 200) {
      return response
    } else {
      // 报错信息——弹窗提示（bug解决：后台传参有时没有data.message字段）
      Message.error(msg)
      return Promise.reject(msg)
    }
    // return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
