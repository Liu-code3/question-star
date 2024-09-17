import type { FC } from 'react'

import { Button, Form, Input, Space, Typography, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import styles from '../auth.module.scss'
import { LOGIN_PATHNAME } from '@/router/constant.ts'
import { registerApi } from '@/api/auth.ts'

interface FormType {
  username: string
  password: string
  confirm: string
  nickname: string
}

const { Title } = Typography
const Register: FC = () => {
  const navigate = useNavigate()
  const { run } = useRequest(
    async (username: string, password: string, nickname: string) => {
      const dataParams = {
        username,
        password,
        nickname
      }
      const res = await registerApi(dataParams)
      return res
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        navigate(LOGIN_PATHNAME)
      }
    }
  )
  const onFinish = (value: FormType) => {
    const { username, password, nickname } = value || {}
    run(username, password, nickname)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在5 - 20之间'
              },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >

            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  else {
                    return Promise.reject(new Error('两次密码不一致'))
                  }
                }
              })
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[
              { required: true, message: '请输入昵称' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 6 }}
          >
            <Space>
              <Button
                type="primary"
                htmlType="submit"
              >
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号, 登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
