import type { FC } from 'react'
import { Empty, Spin, Typography } from 'antd'
import { useTitle } from 'ahooks'
import styles from '@/views/manage/common.module.scss'
import type { PropsType } from '@/components/QuestionCard'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch.tsx'
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData.ts'
import ListPagination from '@/components/ListPagination.tsx'

const { Title } = Typography

const Star: FC = () => {
  useTitle('小星问卷 - 星标问卷')

  const { data, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data?.data || {}
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
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
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  )
}
export default Star
