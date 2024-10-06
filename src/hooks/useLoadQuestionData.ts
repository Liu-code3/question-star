import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getQuestionItemApi } from '@/api/question.ts'
import { resetComponents } from '@/store/componentsReducer'
import { resetPageInfo } from '@/store/pageInfoReducer.ts'

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
    const { title = '', desc = '', js = '', css = '', componentList = [], isPublished = false } = data?.data || {}
    const selectedId = componentList.length > 0 ? componentList[0]?.fe_id : '' // 默认选中第一个组件

    // 把 componentList 存储到  Redux store中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

    // 把 pageInfo 存储到 redux store
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))

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
