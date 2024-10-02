interface IOptions {
  value: string
  label: string
  checked: boolean
}

interface IQuestionCheckboxProps {
  title?: string
  isVertical?: boolean
  list?: IOptions[]

  onChange?: (newProps: IQuestionCheckboxProps) => void
  disabled?: boolean
}

const QuestionCheckboxDefaultProps: IQuestionCheckboxProps = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', label: '选项一', checked: false },
    { value: 'item2', label: '选项二', checked: false },
    { value: 'item3', label: '选项三', checked: false },
  ]
}

export type { IOptions, IQuestionCheckboxProps }
export { QuestionCheckboxDefaultProps }
