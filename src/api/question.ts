import { requset } from '@/utils/http/index.js'

interface SearchType {
  keyword: string
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

export {
  testApi,
  createQuestionApi,
  getQuestionListApi
}
