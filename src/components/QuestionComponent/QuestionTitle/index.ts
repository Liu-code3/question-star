/**
 * @description  问卷  标题
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './type'

export * from './type'

// Title 组件配置
export default {
  title: '标题',
  type: 'questionTitle', // 需与后端一致
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps
}
