import type { FC } from 'react'
import { Typography } from 'antd'
import type { IQuestionTitleProps } from '@/components/QuestionComponent/QuestionTitle/type.ts'
import { QuestionTitleDefaultProps } from '@/components/QuestionComponent/QuestionTitle/type.ts'

const { Title } = Typography
const QuestionTitle: FC<IQuestionTitleProps> = (props) => {
  const { level = 1, text = '一级标题', isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  return (
    <div>
      <Title
        level={level}
        className={isCenter ? 'text-center' : ''}
        style={{ marginBottom: 0 }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
