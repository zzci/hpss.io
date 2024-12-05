/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.data.msg) {
      message.success(response.data.msg)
    }
    return response.data
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // 客户端环境
          window && (location.href = '/user/login')
        case 500:
          message.error(error.response.data.msg)
      }
    }
    return Promise.reject(error)
  }
)

export default instance
