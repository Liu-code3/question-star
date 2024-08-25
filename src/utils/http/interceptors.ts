import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { localCache } from '../cache.ts'

import { handlerError, reloadCodes, requestConfig } from './config.ts'

// TODO 消息提示
export function setupInterceptors(axiosInstance: AxiosInstance) {
  function reqResolve(config: InternalAxiosRequestConfig) {
    const token = localCache.getCache(requestConfig.TOKEN_NAME)

    if (token)
      config.headers[requestConfig.TOKEN_NAME] = requestConfig.TOKEN_PREFIX + token

    if (!requestConfig.REQUEST_CACHE && config.method === 'get') {
      config.params = config.params || {}
      config.params._ = new Date().getTime()
    }
    Object.assign(config.headers, requestConfig.HEADERS)
    return config
  }

  function reqReject(error: AxiosError) {
    return Promise.reject(error)
  }

  function resResolve(response: AxiosResponse) {
    const code: number = response.data.code
    const data = response.data

    if (reloadCodes.includes(code)) {
      // if (!loginBack.value)
      // error();

      return Promise.reject(data)
    }

    if (code !== 200) {
      const customErrorMessage = response.config.data.msg
      console.log('=>(interceptors.ts:39) customErrorMessage', customErrorMessage)
      // message.error(customErrorMessage || data.msg);
      return Promise.reject(response)
    }
    else {
      // 请求成功
      const msg = data.msg || '请求成功'
      console.log('=>(interceptors.ts:46) msg', msg)
      // message.success(msg);
      return Promise.resolve(data)
    }
  }

  function resReject(error: AxiosError) {
    if (error) {
      handlerError(error)
      return Promise.reject(error)
    }
  }

  axiosInstance.interceptors.request.use(reqResolve, reqReject)
  axiosInstance.interceptors.response.use(resResolve, resReject)
}
