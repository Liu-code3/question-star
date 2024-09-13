import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LIST_SEARCH_PARAM_KEY } from '@/constant'
import { getQuestionListApi } from '@/api/question.ts'

async function loadData(searchParams: URLSearchParams) {
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  return await getQuestionListApi({ keyword })
}

export function useLoadQuestionListData() {
  const [searchParams] = useSearchParams()

  const { data, loading, error } = useRequest(
    () => loadData(searchParams),
    {
      refreshDeps: [searchParams] // 刷新的依赖项 (useRequest也是基于useEffect的)
    }
  )

  return {
    data,
    loading,
    error
  }
}
