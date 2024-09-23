import type { FC } from 'react'
import { Input, Typography } from 'antd'
import type { IQuestionInputProps } from './type.ts'
import { QuestionInputDefaultProps } from './type.ts'

const { Paragraph } = Typography
const QuestionInput: FC<IQuestionInputProps> = (props) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}

export default QuestionInput
