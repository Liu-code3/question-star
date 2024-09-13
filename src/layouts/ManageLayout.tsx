import type { FC } from 'react'
import { Button, Space, message } from 'antd'
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import styles from './ManageLayout.module.scss'
import { createQuestionApi } from '@/api/question.ts'

const ManageLayout: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { loading, run: handleCreateClick } = useRequest(createQuestionApi, {
    manual: true,
    onSuccess(res) {
      message.success('创建成功')
      navigate(`/question/edit/${res.data.id}`)
    }
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
