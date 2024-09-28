interface IQuestionTitleProps {
  level?: 1 | 2 | 3 | 4 | 5
  text?: string
  isCenter?: boolean

  onChange?: (newProps: IQuestionTitleProps) => void
  disabled?: boolean
}

const QuestionTitleDefaultProps: IQuestionTitleProps = {
  level: 1,
  isCenter: false,
  text: '一级标题'
}

export {
  QuestionTitleDefaultProps
}

export type { IQuestionTitleProps }
