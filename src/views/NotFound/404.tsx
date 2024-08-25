import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '@/router/constant.ts'

const NotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={(
        <Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
          返回首页
        </Button>
      )}
    >
    </Result>
  )
}

export default NotFound
