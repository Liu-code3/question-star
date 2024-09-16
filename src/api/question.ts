import { requset } from '@/utils/http/index.js'

interface SearchType {
  keyword: string
  isDeleted: boolean
  isStar: boolean
  page: number
  pageSize: number
}

function testApi() {
  return requset.get('/test')
}

/**
 * 创建问题
 */
function createQuestionApi() {
  return requset.post('/question')
}

/**
 * 获取问题列表
 */
function getQuestionListApi(options: Partial<SearchType>) {
  return requset.get('/question', {
    params: options
  })
}

/**
 * 更新问题
 */
function updateQuestionItemApi<T>(id: string, options: { [key: string]: T }) {
  return requset.patch(`/question/${id}`, { ...options })
}

function duplicateQuestionApi(id: string) {
  return requset.post(`/question/duplicate/${id}`)
}

export {
  testApi,
  createQuestionApi,
  getQuestionListApi,
  updateQuestionItemApi,
  duplicateQuestionApi
}
