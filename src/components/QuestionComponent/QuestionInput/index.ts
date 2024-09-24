/**
 * @description  问卷  输入框
 */
import Component from './Component'
import { QuestionInputDefaultProps } from './type'

export * from './type'

// Input 组件配置
export default {
  title: '输入框',
  type: 'questionInput', // 需与后端一致
  Component,
  defaultProps: QuestionInputDefaultProps
}
