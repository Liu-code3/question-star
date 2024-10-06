import type { FC } from 'react'
import classnames from 'classnames'
import styles from './ComponentList.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'
import { getComponentConfigByType } from '@/components/QuestionComponent'

interface IProps {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
const ComponentList: FC<IProps> = (props) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType
  } = props

  const { componentList } = useGetComponentInfo()
  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden) // 过滤隐藏的组件
        .map((c) => {
          const { fe_id, props, type } = c
          const componentConfig = getComponentConfigByType(type)
          if (!componentConfig)
            return null

          const { Component } = componentConfig
          //     拼接class name
          const wrapperClassName = classnames({
            [styles['component-wrapper']]: true,
            [styles.selected]: fe_id === selectedComponentId // 是否选中
          })

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
