import { requset } from '@/utils/http/index.js'

/** 获取用户信息 */
function getUserInfoApi() {
  return requset.get('/user/info')
}

/** 注册 */
function registerApi<T>(data: T) {
  return requset.post('/user/register', data)
}

/** 登录 */
function loginApi<T>(data: T) {
  return requset.post('/user/login', data)
}

export {
  getUserInfoApi,
  registerApi,
  loginApi
}
