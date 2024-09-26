import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getQuestionItemApi } from '@/api/question.ts'
import { resetComponents } from '@/store/componentsReducer'

export function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { data, loading, error, run } = useRequest(async (id: string) => {
    if (!id)
      return message.warning('无法查看问卷')

    return await getQuestionItemApi(id)
  }, {
    manual: true
  })

  // 根据获取的data设置 redux store
  useEffect(() => {
    if (!data)
      return

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { componentList = [] } = data?.data || {}

    dispatch(resetComponents({ componentList }))
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
  }, [data?.data])

  // 判断 id 变化, 执行 ajax 加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return {
    loading,
    error
  }
}
