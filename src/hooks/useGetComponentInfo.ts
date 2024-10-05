import { useSelector } from 'react-redux'
import type { IState } from '@/store'

export function useGetComponentInfo() {
  const components = useSelector((state: IState) => state.components.present)

  const { componentList = [], selectedId = '', copiedComponent } = components

  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}
