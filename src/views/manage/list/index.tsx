import type { FC } from 'react'
import { Empty, Spin, Typography } from 'antd'
import { useTitle } from 'ahooks'
import styles from '../common.module.scss'
import type { PropsType } from '@/components/QuestionCard'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch.tsx'
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData.ts'

const { Title } = Typography

const List: FC = () => {
  useTitle('小星问卷 - 我的问卷')

  const { data, loading } = useLoadQuestionListData()
  const { list = [], total = 0 } = data?.data || {}

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
      <div className={styles.content}>
        {/* 问卷列表 */}
        {loading && <div className="text-center"><Spin /></div>}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {
          list.length > 0
          && list.map((q: PropsType) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })
        }
      </div>
      <h3>
        总条数:
        { total }
      </h3>
      <div className={styles.footer}>loadMore 上划加载更多...</div>
    </>
  )
}

export default List
