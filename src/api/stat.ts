import { requset } from '@/utils/http/index.js'

interface StatPageType {
  page: number
  pageSize: number
}
function getQuestionStatListApi(id: string, params: StatPageType) {
  return requset.get(`/stat/${id}`, { params })
}

export {
  getQuestionStatListApi
}
