import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { useGetUserInfo } from '@/hooks/useGetUserInfo.ts'
import { getUserInfoApi } from '@/api/auth.ts'
import { setUserInfo } from '@/store/userReducer.ts'

export function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)

  const dispatch = useDispatch()
  const { run } = useRequest(getUserInfoApi, {
    manual: true,
    onSuccess(result) {
      const { nickname, username } = result?.data || {}
      dispatch(setUserInfo({ nickname, username }))
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })

  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }

    run()
  }, [username])

  return { waitingUserData }
}
