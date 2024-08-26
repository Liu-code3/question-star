import type { FC } from 'react'
import { useState } from 'react'
import { Typography } from 'antd'
import styles from '../common.module.scss'
import type { PropsType } from '@/components/QuestionCard'
import QuestionCard from '@/components/QuestionCard'

const { Title } = Typography

const List: FC = () => {
  const [list] = useState([]) // 全部的列表数据，上划加载更多，累计
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
        {
          list.length > 0
          && list.map((q: PropsType) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })
        }
      </div>
      <div className={styles.footer}>
        <div>底部</div>
      </div>
    </>
  )
}

export default List
