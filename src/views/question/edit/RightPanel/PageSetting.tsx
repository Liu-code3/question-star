import type { FC } from 'react'
import { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { useGetPageInfo } from '@/hooks/useGetPageInfo.ts'
import { resetPageInfo } from '@/store/pageInfoReducer.ts'

const { TextArea } = Input
const PageSetting: FC = () => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      form={form}
      onChange={handleValuesChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item
        label="问卷描述"
        name="desc"
      >
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item
        label="样式代码"
        name="css"
      >
        <TextArea placeholder="输入 css 样式代码..." />
      </Form.Item>
      <Form.Item
        label="脚本代码"
        name="js"
      >
        <TextArea placeholder="输入 js 样式代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
