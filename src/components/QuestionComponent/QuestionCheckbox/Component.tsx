import type { FC } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import type { IQuestionCheckboxProps } from './type'
import { QuestionCheckboxDefaultProps } from './type'

const { Paragraph } = Typography
const Component: FC<IQuestionCheckboxProps> = (props) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space
        direction={isVertical ? 'vertical' : 'horizontal'}
        size={2}
        wrap
      >
        { list.map((opt) => {
          const { value, label, checked } = opt
          return <Checkbox key={value} checked={checked}>{label}</Checkbox>
        })}
      </Space>
    </div>
  )
}

export default Component
