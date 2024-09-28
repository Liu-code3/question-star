interface IQuestionInputProps {
  title?: string
  placeholder?: string

  onChange?: (newProps: IQuestionInputProps) => void
  disabled?: boolean
}

const QuestionInputDefaultProps: IQuestionInputProps = {
  title: '输入框',
  placeholder: '请输入内容'
}

export type { IQuestionInputProps }
export { QuestionInputDefaultProps }
