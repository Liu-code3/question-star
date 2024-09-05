import type { FC } from 'react'
import { useState } from 'react'
import { Empty, Typography } from 'antd'
import { useTitle } from 'ahooks'
import styles from '../common.module.scss'
import type { PropsType } from '@/components/QuestionCard'
import QuestionCard from '@/components/QuestionCard'

const { Title } = Typography

const rawQuestionList = [{
  _id: '1', // 服务端 mongodb ，自动，_id 不重复
  title: '问卷1',
  isStar: true,
  isPublished: true,
  answerCount: 100,
  createdAt: '2024-09-04 22:30'
}]

const List: FC = () => {
  useTitle('小星问卷 - 我的问卷')
  const [questionList] = useState(rawQuestionList) // 全部的列表数据，上划加载更多，累计
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          搜索
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {
          questionList.length > 0
          && questionList.map((q: PropsType) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })
        }
      </div>
      <div className={styles.footer}>loadMore 上划加载更多...</div>
    </>
  )
}

export default List
