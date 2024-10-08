interface IOptions {
  label: string
  value: string
}

interface IQuestionRadioProps {
  title?: string
  isVertical?: boolean
  options?: IOptions[]
  value?: string

  onChange?: (newProps: IQuestionRadioProps) => void
  disabled?: boolean
}

interface IQuestionRadioStatProps {
  stat: Array<{name: string; count: number}>
}

const QuestionRadioDefaultProps: IQuestionRadioProps = {
  title: '单选标题',
  isVertical: false,
  options: [
    { value: 'item1', label: '选项1' },
    { value: 'item2', label: '选项2' },
    { value: 'item3', label: '选项3' },
  ],
  value: ''
}

export type { IQuestionRadioProps, IOptions, IQuestionRadioStatProps }
export { QuestionRadioDefaultProps }
