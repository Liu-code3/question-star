import {FC, useEffect} from 'react'
import { Form, Input } from 'antd'
import type { IQuestionTextareaProps } from './type'

const { TextArea } = Input
const PropComponent: FC<IQuestionTextareaProps> = (props) => {
  const {
    title,
    placeholder,
    onChange,
    disabled
  } = props

  const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    }, [title, placeholder]);

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
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Placeholder"
        name="placeholder"
      >
        <TextArea autoSize />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
