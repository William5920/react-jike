// 用户登录相关api
import {request} from '@/utils'

// 登录
export function loginAPI(loginForm) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: loginForm
  })
}

// 获取用户信息
export function userProfileAPI() {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}