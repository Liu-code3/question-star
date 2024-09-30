import type { FC } from 'react'
import { Input, Typography } from 'antd'
import type { IQuestionTextareaProps } from './type'
import { QuestionTextareaDefaultProps } from './type'

const { Paragraph } = Typography
const { TextArea } = Input
const QuestionTextarea: FC<IQuestionTextareaProps> = (props) => {
  const { title = '', placeholder = '' } = { ...QuestionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default QuestionTextarea
