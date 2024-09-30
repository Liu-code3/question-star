import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './type'

export * from './type'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps
}
