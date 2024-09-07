import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import type { FC } from 'react'
import styles from './index.module.scss'

const { Title } = Typography
const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Space>
        <Title>
          <FormOutlined />
        </Title>
        <Title>小星问卷</Title>
      </Space>
    </div>
  )
}

export default Logo
