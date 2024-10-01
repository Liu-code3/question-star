import type { FC } from 'react'
import { useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import type { IOptions, IQuestionRadioProps } from './type'

const PropComponent: FC<IQuestionRadioProps> = (props) => {
  const {
    title,
    isVertical,
    value,
    options,
    onChange,
    disabled
  } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])

  function handleValuesChange() {
    if (!onChange)
      return
    onChange(form.getFieldsValue())
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="标题">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/*  当前选项 输入框 */}
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const allValues: string[] = getFieldValue('options').map((item: IOptions) => item.label)
                            if (allValues.filter(v => v === value).length > 1) {
                              return Promise.reject(new Error('选项文字不能重复'))
                            }
                            return Promise.resolve()
                          },
                        }),
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>
                    {/*    当前选项 删除按钮 */}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  block={true}
                  onClick={() => add({ label: '', value: nanoid(5) })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options?.map(({ label, value }) => ({ label, value }))}
          allowClear
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
