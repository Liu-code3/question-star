import { useSelector } from 'react-redux'
import type { IState } from '@/store'

export function useGetUserInfo() {
  const { username, nickname } = useSelector((state: IState) => state.user)
  return { username, nickname }
}
