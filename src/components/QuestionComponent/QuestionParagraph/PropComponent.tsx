import type { FC } from 'react'
import { useEffect } from 'react'
import { Checkbox, Form, Input } from 'antd'
import type { IQuestionParagraphProps } from './type'

const { TextArea } = Input
const PropComponent: FC<IQuestionParagraphProps> = (props) => {
  const {
    text,
    isCenter,
    onChange,
    disabled
  } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  function handleValueChange() {
    if (!onChange)
      return

    onChange(form.getFieldsValue())
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        name="isCenter"
        valuePropName="checked"
      >
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
