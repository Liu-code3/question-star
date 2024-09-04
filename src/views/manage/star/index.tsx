import type { FC } from 'react'
import { useState } from 'react'
import { Empty, Typography } from 'antd'
import styles from '@/views/manage/common.module.scss'
import type { PropsType } from '@/components/QuestionCard'
import QuestionCard from '@/components/QuestionCard'
import {useTitle} from "ahooks";

const { Title } = Typography

const rawQuestionList = [{
  _id: '1', // 服务端 mongodb ，自动，_id 不重复
  title: '问卷1',
  isStar: true,
  isPublished: true,
  answerCount: 100,
  createdAt: '小生'
}]
const Star: FC = () => {
  useTitle('小星问卷 - 星标问卷')
  const [questionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
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
      <div className={styles.footer}>分页</div>
    </>
  )
}
export default Star
