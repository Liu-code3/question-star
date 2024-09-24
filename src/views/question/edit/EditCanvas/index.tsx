import type { FC } from 'react'
import { Spin } from 'antd'
import styles from './index.module.scss'

// 临时展示封装组件
import QuestionTitle from '@/components/QuestionComponent/QuestionTitle/Component.tsx'
import QuestionInput from '@/components/QuestionComponent/QuestionInput/Component.tsx'

interface IEditCanvasProps {
  loading: boolean
}
const EditCanvas: FC<IEditCanvasProps> = ({ loading }) => {
  if (loading) {
    return (
      <div className="mt-6 text-center">
        <Spin />
      </div>
    )
  }
  return (
    // 这里html分层 需要借鉴 单一组件原则
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle></QuestionTitle>
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
