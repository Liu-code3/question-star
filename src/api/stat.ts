import { requset } from '@/utils/http/index.js'

interface StatPageType {
  page: number
  pageSize: number
}
function getQuestionStatListApi(id: string, params: StatPageType) {
  return requset.get(`/stat/${id}`, { params })
}

function getComponentStatApi (questionId: string, componentId: string) {
  return requset.get(`/stat/${questionId}/${componentId}`)
}

export {
  getQuestionStatListApi,
  getComponentStatApi
}
