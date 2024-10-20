import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, isLoginOrRegister } from '@/router/constant.ts'
import { localCache } from '@/utils/cache.ts'
import { requestConfig } from '@/utils/http/config.ts'

export function useNavPage(waitingUserData: boolean) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = localCache.getCache(requestConfig.TOKEN_NAME)

  useEffect(() => {
    if (waitingUserData)
      return

    if (token) {
      if (isLoginOrRegister(pathname)) {
        navigate(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    if (!isLoginOrRegister(pathname)) {
      navigate(LOGIN_PATHNAME)
    }
  }, [token, pathname, waitingUserData])
}
