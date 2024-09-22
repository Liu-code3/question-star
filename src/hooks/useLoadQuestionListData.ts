import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LIST_DEFAULT_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from '@/constant'
import { getQuestionListApi } from '@/api/question.ts'

interface TQuestionListItem {
  isDeleted: boolean
  isStar: boolean
  page: number
  pageSize: number
}

async function loadData(searchParams: URLSearchParams, isDeleted: boolean, isStar: boolean) {
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const page = Number.parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '1')
  const pageSize = Number.parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || LIST_DEFAULT_PAGE_SIZE)

  return await getQuestionListApi({ keyword, isDeleted, isStar, page, pageSize })
}

export function useLoadQuestionListData(options: Partial<TQuestionListItem> = {}) {
  const { isDeleted = false, isStar = false } = options

  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    () => loadData(searchParams, isDeleted, isStar),
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
