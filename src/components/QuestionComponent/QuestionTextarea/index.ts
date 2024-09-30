import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './type'

export * from './type'

// Textarea
export default {
  title: '多行输入',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps
}
