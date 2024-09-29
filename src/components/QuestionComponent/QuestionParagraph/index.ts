import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './type'

export * from './type'

// Paragraph 段落组件配置
export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps
}
