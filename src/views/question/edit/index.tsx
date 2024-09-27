import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData.ts'
import { changeSelectedId } from '@/store/componentsReducer'
import LeftPanel from '@/views/question/edit/LeftPanel'
import EditCanvas from '@/views/question/edit/EditCanvas'
import RightPanel from '@/views/question/edit/RightPanel'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <div className="h-10 bg-#fff">Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
