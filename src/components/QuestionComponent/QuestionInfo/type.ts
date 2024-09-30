interface IQuestionInfoProps {
  title?: string
  desc?: string

  onChange?: (newProps: IQuestionInfoProps) => void
  disabled?: boolean
}

const QuestionInfoDefaultProps: IQuestionInfoProps = {
  title: '问卷标题',
  desc: '问卷描述...'
}

export type { IQuestionInfoProps }
export { QuestionInfoDefaultProps }
