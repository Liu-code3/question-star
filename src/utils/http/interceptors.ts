import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { message } from 'antd'
import { localCache } from '../cache.ts'

import { handlerError, reloadCodes, requestConfig, successCodes } from './config.ts'

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
    const code = response.data.code || response.status
    const data = response.data || {}

    if (reloadCodes.includes(code)) {
      // if (!loginBack.value)
      // error();

      return Promise.reject(data)
    }

    if (!successCodes.includes(code)) {
      const customErrorMessage = response.data?.message
      message.error(customErrorMessage || '网络错误', 1)
      return Promise.reject(response)
    }
    else {
      // 请求成功
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
