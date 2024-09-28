import type { IComponentInfo } from '@/store/componentsReducer/index.ts'

export function getNextSelectedId(fe_id: string, componentList: IComponentInfo[]) {
  const len = componentList.length
  const curIndex = componentList.findIndex(c => c.fe_id === fe_id)
  if (curIndex < 0 || len === 1)
    return ''

  return curIndex === len - 1 ? componentList[curIndex - 1].fe_id : componentList[curIndex + 1].fe_id
}
