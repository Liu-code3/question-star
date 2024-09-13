import { requset } from '@/utils/http/index.js'

function testApi() {
  return requset.get('/test')
}

/**
 *
 */
function createQuestionApi() {
  return requset.post('/question')
}

/**
 * 获取问题列表
 */
function getQuestionListApi() {
  return requset.get('/question')
}

export {
  testApi,
  createQuestionApi,
  getQuestionListApi
}
