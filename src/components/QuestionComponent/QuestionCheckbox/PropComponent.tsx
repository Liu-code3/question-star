import type { FC } from 'react'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import type { IOptions, IQuestionCheckboxProps } from './type'

const PropComponent: FC<IQuestionCheckboxProps> = (props) => {
  const {
    title,
    isVertical,
    list,
    onChange,
    disabled
  } = props
  const [form] = Form.useForm()

  function handleValuesChange() {
    if (!onChange)
      return

    onChange(form.getFieldsValue())
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'checked']}
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        ({ getFieldValue }) => ({
                          validator(_, value: string) {
                            const allValues: string[] = getFieldValue('list').map((item: IOptions) => item.label)
                            if (allValues.filter(v => v === value).length > 1) {
                              return Promise.reject(new Error('选项文字不能重复'))
                            }
                            return Promise.resolve()
                          },
                        }),
                      ]}
                    >
                      <Input placeholder="请输入选项文字..." />
                    </Form.Item>
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ label: '', value: nanoid(5) })}
                  block={true}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
