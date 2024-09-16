import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { Divider, Empty, Spin, Typography } from 'antd'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import styles from '../common.module.scss'
import ListSearch from '@/components/ListSearch.tsx'
import { getQuestionListApi } from '@/api/question.ts'
import { LIST_DEFAULT_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/constant'
import type { PropsType } from '@/components/QuestionCard'
import QuestionCard from '@/components/QuestionCard'

const { Title } = Typography

const List: FC = () => {
  useTitle('小星问卷 - 我的问卷')

  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const moreLoading = useRef(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams() // url参数 虽然没有 page pageSize 但有keyword

  const { run: load, loading } = useRequest(
    async () => {
      moreLoading.current = true
      return await getQuestionListApi({
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
        page,
        pageSize: Number.parseInt(LIST_DEFAULT_PAGE_SIZE)
      })
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: listData = [], total: totalData } = result.data
        setList(list.concat(listData))
        setTotal(totalData)
      }
    }
  )

  // 触发加载
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const scrollH = containerRef.current?.scrollHeight || 0
      const viewH = containerRef.current?.offsetHeight || 0
      const scrollTop = containerRef.current?.scrollTop || 0
      if ((scrollH - viewH - scrollTop <= 100)) {
        if (page > 1 && (list.length >= total))
          return
        setPage(page + 1)
        load()
      }
    },
    {
      wait: 500
    }
  )

  // 1.当页面加载, 或者url参数(keyword)变化时  触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 2.当页面滚动的时候,要尝试触发加载
  useEffect(() => {
    const el = containerRef.current
    el && el.addEventListener('scroll', tryLoadMore)

    return () => {
      el && el.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams])

  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  }

  const loadingMoreEl = <div style={contentStyle} />

  const loadingMoreContentEle = () => {
    if (!moreLoading.current || loading) {
      return (
        <div className="text-center">
          <Spin tip="加载中..." size="large">{loadingMoreEl}</Spin>
        </div>
      )
    }

    if (list.length === 0)
      return <Empty description="暂无数据" />

    if (list.length >= total)
      return <Divider style={{ fontSize: '14px', color: '#999' }}>我也是有底线的...</Divider>
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div
        className={[styles.content, 'h-282.5', 'overflow-y-auto'].join(' ')}
        ref={containerRef}
      >
        {/* 问卷列表 */}
        {list.length > 0 && list.map((q: PropsType) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
        {loadingMoreContentEle()}
      </div>
    </>
  )
}

export default List
