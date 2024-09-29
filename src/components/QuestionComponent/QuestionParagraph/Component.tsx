import type { FC } from 'react'
import { Typography } from 'antd'
import type { IQuestionParagraphProps } from './type'
import { QuestionParagraphDefaultProps } from './type'

const { Paragraph } = Typography
const QuestionParagraph: FC<IQuestionParagraphProps> = (props) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  const textList = text.split('\n')

  return (
    <Paragraph
      className={isCenter ? 'text-center' : ''}
      style={{ marginBottom: 0 }}
    >
      {textList.map((text, index) => {
        return (
          <span key={index}>
            { index > 0 && <br />}
            {text}
          </span>
        )
      })}
    </Paragraph>
  )
}

export default QuestionParagraph
