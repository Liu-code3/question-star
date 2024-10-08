import type { FC } from 'react'
import { useEffect } from 'react'

import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import styles from '../auth.module.scss'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '@/router/constant.ts'
import { localCache } from '@/utils/cache.ts'
import { loginApi } from '@/api/auth.ts'
import { requestConfig } from '@/utils/http/config.ts'

interface FormType {
  username: string
  password: string
  remember: boolean
}
const { Title } = Typography

const USER_INFO = 'userInfo'
function rememberUser(username: string, password: string) {
  localCache.setCache(USER_INFO, { username, password })
}

function deleteUserFromStore() {
  localCache.removeCache(USER_INFO)
}

function getUserInfoFromStore() {
  const userInfo = localCache.getCache(USER_INFO) as { username: string, password: string }
  const { username, password } = userInfo || {}
  return {
    username,
    password
  }
}

const Login: FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getUserInfoFromStore()
    form.setFieldsValue({ username, password })
  }, [form])

  const { run } = useRequest(
    async (username: string, password: string) => {
      const dataParams = {
        username,
        password
      }
      const res = await loginApi(dataParams)
      return res
    },
    {
      manual: true,
      onSuccess(result) {
        localCache.setCache(requestConfig.TOKEN_NAME, result.data)
        message.success('登录成功')
        navigate(MANAGE_INDEX_PATHNAME)
      }
    }
  )

  const onFinish = (value: FormType) => {
    const { username, password, remember } = value
    run(username, password)
    remember ? rememberUser(username, password) : deleteUserFromStore()
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
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
                message: '字符长度在5 - 20 之间'
              },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' }
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 20 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
            <Space>
              <Button type="primary" htmlType="submit">登录</Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
