/**
 * @description  问卷  标题
 */
import Component from './Component'
import { QuestionTitleDefaultProps } from './type'

export * from './type'

export default {
  title: '标题',
  type: 'questionTitle', // 需与后端一致
  Component,
  defaultProps: QuestionTitleDefaultProps
}