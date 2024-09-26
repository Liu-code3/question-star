import type { FC } from 'react'
import styles from './index.module.scss'
import EditCanvas from '@/views/question/edit/EditCanvas'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData.ts'
import LeftPanel from '@/views/question/edit/LeftPanel'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  return (
    <div className={styles.container}>
      <div className="h-10 bg-#fff">Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}><LeftPanel /></div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
