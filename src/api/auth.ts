import { request } from '@/utils/http/index.js'
import { noCredential } from '@/utils/http/config.ts'

/** 获取用户信息 */
function getUserInfoApi() {
  return request.get('/user/info')
}

/** 注册 */
function registerApi<T>(data: T) {
  return request.post('/user/register', data, noCredential)
}

/** 登录 */
function loginApi<T>(data: T) {
  return request.post('/user/login', data, noCredential)
}

export {
  getUserInfoApi,
  registerApi,
  loginApi
}
