interface IQuestionParagraphProps {
  text?: string
  isCenter?: boolean

  onChange?: (newProps: IQuestionParagraphProps) => void
  disabled?: boolean
}

const QuestionParagraphDefaultProps: IQuestionParagraphProps = {
  text: '一行段落',
  isCenter: false
}

export {
  QuestionParagraphDefaultProps
}

export type { IQuestionParagraphProps }
