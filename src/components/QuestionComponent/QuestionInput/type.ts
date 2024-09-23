interface IQuestionInputProps {
  title?: string
  placeholder?: string
}

const QuestionInputDefaultProps: IQuestionInputProps = {
  title: '输入框',
  placeholder: '请输入内容'
}

export type { IQuestionInputProps }
export { QuestionInputDefaultProps }
