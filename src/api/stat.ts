import { request } from '@/utils/http/index.js'

interface StatPageType {
  page: number
  pageSize: number
}
function getQuestionStatListApi(id: string, params: StatPageType) {
  return request.get(`/stat/${id}`, { params })
}

function getComponentStatApi(questionId: string, componentFeId: string) {
  return request.get(`/stat/${questionId}/${componentFeId}`)
}

export {
  getQuestionStatListApi,
  getComponentStatApi
}
