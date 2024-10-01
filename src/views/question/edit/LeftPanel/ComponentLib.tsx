import type { FC } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import styles from './ComponentLib.module.scss'
import type { IComponentConfig } from '@/components/QuestionComponent'
import { componentConfigGroup } from '@/components/QuestionComponent'
import { addComponent } from '@/store/componentsReducer'

const { Title } = Typography

function GenComponent(c: IComponentConfig) {
  const { type, title, Component, defaultProps } = c
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(addComponent({
      fe_id: nanoid(),
      type,
      title,
      props: defaultProps
    }))
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfigGroup.map((group) => {
        const { groupId, groupName, conponents } = group
        return (
          <div key={groupId}>
            <Title level={5}>{groupName}</Title>
            <div>{conponents.map(c => GenComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
