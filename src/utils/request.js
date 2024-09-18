import axios from 'axios'

const http = axios.create({
  baseUrl: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截
http.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截
http.interceptors.response.use(response => {
  // 2xx范围内的状态码都会触发该函数
  // 对响应数据做点什么
  return response.data
}, error => {
  // 超出2xx范围内的状态码都会触发该函数
  // 对响应错误做点什么
  return Promise.reject(error)
})

export { http }