import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import type { IQuestionInputProps } from './type'

const PropComponent: FC<IQuestionInputProps> = (props) => {
  const {
    title,
    placeholder,
    onChange,
    disabled
  } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  function handleValueChange() {
    if (!onChange)
      return

    onChange(form.getFieldsValue())
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="title"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
