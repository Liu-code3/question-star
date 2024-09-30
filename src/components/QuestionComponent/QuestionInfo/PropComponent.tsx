import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import type { IQuestionInfoProps } from './type'

const { TextArea } = Input
const PropComponent: FC<IQuestionInfoProps> = (props) => {
  const {
    title,
    desc,
    onChange,
    disabled
  } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function hanleValueChange() {
    if (!onChange)
      return

    onChange(form.getFieldsValue())
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      disabled={disabled}
      form={form}
      onValuesChange={hanleValueChange}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
