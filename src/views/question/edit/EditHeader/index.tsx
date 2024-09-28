import type { FC } from 'react'
import { Button, Space } from 'antd'
import { CheckOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const EditHeader: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Button
            type="link"
            icon={<LeftOutlined />}
            onClick={() => navigate(-1)}
          >
            返回
          </Button>
        </div>
        <div className={styles.main}>center</div>
        <div className={styles.right}>
          <Space>
            <Button icon={<CheckOutlined />}>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
