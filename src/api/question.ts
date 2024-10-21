import { request } from '@/utils/http/index.js'

interface SearchType {
  keyword: string
  isDelete: boolean
  isStar: boolean
  page: number
  pageSize: number
}

function testApi() {
  return request.get('/test')
}

/**
 * 创建问题
 */
function createQuestionApi() {
  return request.post('/question')
}

/**
 * 获取问题列表
 */
function getQuestionListApi(options: Partial<SearchType>) {
  return request.get('/question', {
    params: options
  })
}

/**
 * 获取问题详情
 */
function getQuestionItemApi(id: string) {
  return request.get(`/question/${id}`)
}
/**
 * 更新问题
 */
function updateQuestionItemApi<T>(id: string, options: { [key: string]: T }) {
  return request.patch(`/question/${id}`, { ...options })
}

function duplicateQuestionApi(id: string) {
  return request.post(`/question/duplicate/${id}`)
}

function deleteQuestionByIdsApi(ids: string[]) {
  return request.delete(`/question`, { data: ids })
}

export {
  testApi,
  createQuestionApi,
  getQuestionListApi,
  getQuestionItemApi,
  updateQuestionItemApi,
  duplicateQuestionApi,
  deleteQuestionByIdsApi
}
