import type { FC } from 'react'
import styles from './index.module.scss'
import QuestionInput from "@/components/QuestionComponent/QuestionInput/Component.tsx";

const Edit: FC = () => {
  return (
    <div className={styles.container}>
      <div className="h-10 bg-#fff">Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <QuestionInput></QuestionInput>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
