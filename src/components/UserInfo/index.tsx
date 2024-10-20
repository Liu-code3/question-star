import type { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { LOGIN_PATHNAME } from '@/router/constant.ts'
import { localCache } from '@/utils/cache.ts'
import { requestConfig } from '@/utils/http/config.ts'
import { useGetUserInfo } from '@/hooks/useGetUserInfo.ts'
import { clearUserInfo } from '@/store/userReducer.ts'

const UserInfo: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { nickname, username } = useGetUserInfo()

  function logout() {
    dispatch(clearUserInfo())
    localCache.clearCache()
    message.success('退出成功')
    navigate(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span className="text-#e8e8e8">
        <UserOutlined />
        { nickname || username }
      </span>
      <Button type="link" onClick={logout}>登出</Button>
    </>
  )
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  function getToken(): string {
    return localCache.getCache(requestConfig.TOKEN_NAME) || ''
  }

  return (
    <>
      { getToken() ? UserInfo : Login }
    </>
  )
}

export default UserInfo
