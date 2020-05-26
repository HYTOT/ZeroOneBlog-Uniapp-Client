import Uni_App_Axios from 'uni-app-axios'
import { mockMapper } from './mockMapper'
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'

const axios = Uni_App_Axios({
  /**
   * 请求根路径
   */
  url: 'http://127.0.0.1:8080',
})

let requestUrl:string = ''

/**
 * 请求拦截
 */
axios.interceptors.request
.use((config:AxiosRequestConfig) => {
  requestUrl = (config.url?.replace(axios.defaults.url, '') as string)
  console.log(config)
  return config
}, (error:AxiosError) => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
axios.interceptors.response
.use((response:AxiosResponse) => {
  console.log(response)
  return response
}, (_error:AxiosError) => {
  // 响应信息错误则返回假数据
  return mockMapper[requestUrl?.split('?')[0]]
})

export default axios