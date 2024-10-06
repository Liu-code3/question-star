import type { FC } from 'react'
import { useTitle } from 'ahooks'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import StatHeader from './StatHeader/StatHeader'
import { useGetPageInfo } from '@/hooks/useGetPageInfo.ts'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData.ts'

const Stat: FC = () => {
  const navigate = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()
  useTitle(`问卷统计-${title}`)

  // loading Element
  const loadingEle = (
    <div className="layout-abs-center h-100% w-100%">
      <Spin size="large" />
    </div>
  )

  function genComponent() {
    if (!isPublished) {
      return (
        <Result
          status="warning"
          title="该问卷还未发布"
          extra={(
            <Button type="primary" onClick={() => navigate(-1)}>
              返回
            </Button>
          )}
        >
        </Result>
      )
    }

    return (
      <>
        <div className={styles.left}>左</div>
        <div className={styles.main}>中</div>
        <div className={styles.right}>右</div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && loadingEle}
        {!loading && <div className={styles.content}>{genComponent()}</div>}
      </div>
    </div>
  )
}

export default Stat
