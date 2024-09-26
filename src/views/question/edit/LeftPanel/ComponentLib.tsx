import type { FC } from 'react'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import type { IComponentConfig } from '@/components/QuestionComponent'
import { componentConfigGroup } from '@/components/QuestionComponent'

const { Title } = Typography

function genComponent(c: IComponentConfig) {
  const { Component } = c
  return (
    <div className={styles.wrapper}>
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
            <div>{conponents.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
