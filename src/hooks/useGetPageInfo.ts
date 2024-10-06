import { useSelector } from 'react-redux'
import type { IState } from '@/store'

export function useGetPageInfo() {
  const state = useSelector((state: IState) => state.pageInfo)
  return state
}
