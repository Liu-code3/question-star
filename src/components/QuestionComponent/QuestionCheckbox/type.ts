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

interface IQuestionCheckboxStatProps {
  stat: Array<{name: string; count: number}>
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

export type { IOptions, IQuestionCheckboxProps, IQuestionCheckboxStatProps }
export { QuestionCheckboxDefaultProps }
