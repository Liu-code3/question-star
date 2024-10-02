import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './type'

export * from './type'

export default {
  title: '多选框',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps
}
