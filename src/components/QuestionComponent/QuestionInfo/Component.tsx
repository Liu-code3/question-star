import type { FC } from 'react'
import { Typography } from 'antd'
import type { IQuestionInfoProps } from './type'
import { QuestionInfoDefaultProps } from './type'

const { Title, Paragraph } = Typography
const QuestionInfo: FC<IQuestionInfoProps> = (props) => {
  const { title, desc = '' } = { ...QuestionInfoDefaultProps, ...props }

  const descTextList = desc?.split('\n')
  return (
    <div className="text-center">
      <Title>{title}</Title>
      <Paragraph>
        {descTextList.map((item, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {item}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
