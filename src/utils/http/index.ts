import axios from 'axios'
import { setupInterceptors } from './interceptors.ts'

export function createAxios(options = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: import.meta.env.VITE_TIMEOUT,
  }

  const service = axios.create({
    ...defaultOptions,
    ...options,
  })

  setupInterceptors(service)
  return service
}

export const request = createAxios()
