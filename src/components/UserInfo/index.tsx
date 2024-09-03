import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router/constant.ts'

const UserInfo: FC = () => {
  // TODO 用户登录后显示用户信息
  return (
    <Link to={LOGIN_PATHNAME}>登录</Link>
  )
}

export default UserInfo
