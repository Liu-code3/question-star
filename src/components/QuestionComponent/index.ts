import type { FC } from 'react'
import type { IQuestionInputProps } from './QuestionInput'
import type { IQuestionTitleProps } from './QuestionTitle'
import QuestionTitleConfig from './QuestionTitle'
import QuestionInputConfig from './QuestionInput'

// 各个组件的 prop  type
type ComponentPropsType = IQuestionInputProps & IQuestionTitleProps

// 组件的配置
interface IComponentConfig {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//  全部组件配置的列表
const componentConfigList: IComponentConfig[] = [QuestionTitleConfig, QuestionInputConfig]

// 组件分组
const componentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    conponents: [QuestionTitleConfig]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    conponents: [QuestionInputConfig]
  }
]

function getComponentConfigByType(type: string) {
  return componentConfigList.find(item => item.type === type)
}

export type {
  ComponentPropsType,
  IComponentConfig
}

export {
  componentConfigGroup,
  getComponentConfigByType
}
