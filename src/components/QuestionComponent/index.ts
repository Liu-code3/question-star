import type { FC } from 'react'
import type { IQuestionInputProps } from './QuestionInput'
import type { IQuestionTitleProps } from './QuestionTitle'
import type { IQuestionParagraphProps } from './QuestionParagraph'
import type { IQuestionInfoProps } from './QuestionInfo'
import type { IQuestionTextareaProps } from "./QuestionTextarea";
import QuestionTitleConfig from './QuestionTitle'
import QuestionInputConfig from './QuestionInput'
import QuestionParagraphConfig from './QuestionParagraph'
import QuestionInfoConfig from './QuestionInfo'
import QuestionTextareaConfig from './QuestionTextarea'

// 各个组件的 prop  type
type ComponentPropsType = IQuestionInputProps
    & IQuestionTitleProps
    & IQuestionParagraphProps
    & IQuestionInfoProps
    & IQuestionTextareaProps

// 组件的配置
interface IComponentConfig {
  title: string
  type: string
  Component: FC<ComponentPropsType> // 画布所需要的组件
  PropComponent: FC<ComponentPropsType> // 右侧面板所需要的属性组件
  defaultProps: ComponentPropsType
}

//  全部组件配置的列表
const componentConfigList: IComponentConfig[] = [
  QuestionTitleConfig,
  QuestionInputConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig
]

// 组件分组
const componentConfigGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    conponents: [QuestionInfoConfig, QuestionTitleConfig, QuestionParagraphConfig]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    conponents: [QuestionTextareaConfig, QuestionInputConfig]
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
