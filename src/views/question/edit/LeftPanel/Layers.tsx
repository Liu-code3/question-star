import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { Button, Input, Space, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import styles from './Layers.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'
import {
  changeComponentHidden,
  changeComponentLocked,
  changeComponentProps,
  changeComponentTitle,
  changeSelectedId
} from '@/store/componentsReducer'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')
  const dispatch = useDispatch()
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('该组件已隐藏，无法选中')
      return
    }

    if (fe_id !== selectedId) {
      // 当前组件未被选中, 执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }

    // 点击修改标题
    setChangingTitleId(fe_id)
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle)
      return
    if (!selectedId)
      return
    // 修改标题
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
    dispatch(changeComponentProps({ fe_id: selectedId, newProps: { title: newTitle } }))
  }

  function handleHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  function handleLocked(fe_id: string) {
    dispatch(changeComponentLocked({ fe_id }))
  }

  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden = false, isLocked = false } = c

        const titleClassName = classnames({
          [styles.title]: true,
          [styles.selected]: fe_id === selectedId,
        })
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div
              className={titleClassName}
              onClick={() => handleTitleClick(fe_id)}
            >
              {(
                fe_id === changingTitleId)
                && (
                  <Input
                    value={title}
                    onChange={handleChangeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  icon={<EyeInvisibleOutlined />}
                  className={isHidden ? styles.btn : ''}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => handleHidden(fe_id, !isHidden)}
                >
                </Button>
                <Button
                  icon={<LockOutlined />}
                  className={isLocked ? styles.btn : ''}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => handleLocked(fe_id)}
                >
                </Button>
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
