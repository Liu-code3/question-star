import type { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import styles from './index.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'
import type { IComponentInfo } from '@/store/componentsReducer'
import { changeSelectedId } from '@/store/componentsReducer'
import { getComponentConfigByType } from '@/components/QuestionComponent'

function GenComponent(component: IComponentInfo) {
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
  const dispatch = useDispatch()
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  const { componentList, selectedId } = useGetComponentInfo()
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
        const wrapperClassName = classnames({
          [styles['component-wrapper']]: true,
          [styles.selected]: c.fe_id === selectedId
        })

        return (
          <div
            key={c.fe_id}
            className={wrapperClassName}
            onClick={e => handleClick(e, c.fe_id)}
          >
            <div className={styles.component}>
              {GenComponent(c)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
