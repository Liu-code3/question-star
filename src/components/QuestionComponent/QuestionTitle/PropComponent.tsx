import { Checkbox, Form, Input, Select } from 'antd'
import type { FC } from 'react'
import { useEffect } from 'react'
import type { IQuestionTitleProps } from './type'

const PropComponent: FC<IQuestionTitleProps> = (props) => {
  const { level, text, isCenter } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ level, text, isCenter })
  }, [level, text, isCenter])

  return (
    <Form
      layout="vertical"
      initialValues={{ level, text, isCenter }}
      form={form}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select options={[
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' }
        ]}
        >
        </Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
