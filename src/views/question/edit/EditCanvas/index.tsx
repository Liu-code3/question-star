import type { FC } from 'react'
import { Spin } from 'antd'
import styles from './index.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'
import type { IComponentInfo } from '@/store/componentsReducer'
import { getComponentConfigByType } from '@/components/QuestionComponent'

function genComponent(component: IComponentInfo) {
  const { type, props } = component
  const componentConfig = getComponentConfigByType(type)
  const { Component } = componentConfig || {}
  if (!Component)
    return null
  return <Component {...props} />
}

interface IEditCanvasProps {
  loading: boolean
}
const EditCanvas: FC<IEditCanvasProps> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()
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
      {componentList.map((c) => {
        return (
          <div key={c.fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>
              {genComponent(c)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
