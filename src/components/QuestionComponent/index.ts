import type { FC } from 'react'
import type { IQuestionInputProps } from './QuestionInput'
import type { IQuestionTitleProps } from './QuestionTitle'
import QuestionTitleConfig from './QuestionTitle'
import QuestionInputConfig from './QuestionInput'

// 各个组件的 prop  type
export type ComponentPropsType = IQuestionInputProps & IQuestionTitleProps

// 组件的配置
export interface IComponentConfig {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//  全部组件配置的列表
const componentConfigList: IComponentConfig[] = [QuestionTitleConfig, QuestionInputConfig]

export function getComponentConfigByType(type: string) {
  return componentConfigList.find(item => item.type === type)
}
