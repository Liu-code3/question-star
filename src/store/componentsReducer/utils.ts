import type { IComponentInfo } from '@/store/componentsReducer/index.ts'

export function getNextSelectedId(fe_id: string, componentList: IComponentInfo[]) {
  const visibleList = componentList.filter(c => !c.isHidden)
  const len = visibleList.length
  const curIndex = visibleList.findIndex(c => c.fe_id === fe_id)
  if (curIndex < 0 || len === 1)
    return ''

  return curIndex === len - 1 ? visibleList[curIndex - 1].fe_id : visibleList[curIndex + 1].fe_id
}
