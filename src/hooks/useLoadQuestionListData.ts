import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LIST_DEFAULT_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from '@/constant'
import { getQuestionListApi } from '@/api/question.ts'

interface TQuestionListItem {
  isDelete: boolean
  isStar: boolean
  page: number
  pageSize: number
}

async function loadData(searchParams: URLSearchParams, options: Partial<TQuestionListItem> = {}) {
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const page = Number.parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '1')
  const pageSize = Number.parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || LIST_DEFAULT_PAGE_SIZE)

  // 动态构建对象，只传递存在的属性
  const params = {
    keyword,
    page,
    pageSize,
    ...(options.isDelete !== void 0 && { isDelete: options.isDelete }), // 只在 isDelete 存在时才传递
    ...(options.isStar !== void 0 && { isStar: options.isStar }), // 只在 isStar 存在时才传递
  }

  return await getQuestionListApi(params)
}

export function useLoadQuestionListData(options: Partial<TQuestionListItem> = {}) {
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    () => loadData(searchParams, options),
    {
      refreshDeps: [searchParams] // 刷新的依赖项 (useRequest也是基于useEffect的)
    }
  )

  return {
    data,
    loading,
    error,
    refresh
  }
}
