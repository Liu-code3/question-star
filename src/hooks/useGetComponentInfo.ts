import { useSelector } from 'react-redux'
import type { IState } from '@/store'

export function useGetComponentInfo() {
  const components = useSelector((state: IState) => state.components)

  const { componentList = [], selectedId = '' } = components

  return { componentList, selectedId }
}
