/**
 * @description  问卷  输入框
 */
import Component from './Component'
import { QuestionInputDefaultProps } from './type'

export * from './type'

export default {
  title: '输入框',
  type: 'questionInput', // 需与后端一致
  Component,
  defaultProps: QuestionInputDefaultProps
}
