import type { FC } from 'react'
import { Radio, Space, Typography } from 'antd'
import type { IQuestionRadioProps } from './type'
import { QuestionRadioDefaultProps } from './type'

const { Paragraph } = Typography
const Component: FC<IQuestionRadioProps> = (props) => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space
          direction={isVertical ? 'vertical' : 'horizontal'}
          size={2}
          wrap
        >
          { options.map((opt) => {
            const { value, label } = opt
            return (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
