import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetUserInfo } from '@/hooks/useGetUserInfo.ts'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, isLoginOrRegister, isNoNeedUserInfo } from '@/router/constant.ts'

export function useNavPage(waitingUserData: boolean) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { username } = useGetUserInfo()

  useEffect(() => {
    if (waitingUserData)
      return

    if (username) {
      if (isLoginOrRegister(pathname)) {
        navigate(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    if (!isNoNeedUserInfo(pathname)) {
      navigate(LOGIN_PATHNAME)
    }
  }, [pathname, username, waitingUserData])
}
