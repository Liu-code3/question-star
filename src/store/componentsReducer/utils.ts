import type { IComponentInfo, IComponentsState } from '@/store/componentsReducer/index.ts'

/**
 * 获取下一个选中的 fe_id
 * @param fe_id 当前选中的 fe_id
 * @param componentList 组件列表
 */
function getNextSelectedId(fe_id: string, componentList: IComponentInfo[]) {
  const visibleList = componentList.filter(c => !c.isHidden)
  const len = visibleList.length
  const curIndex = visibleList.findIndex(c => c.fe_id === fe_id)
  if (curIndex < 0 || len === 1)
    return ''

  return curIndex === len - 1 ? visibleList[curIndex - 1].fe_id : visibleList[curIndex + 1].fe_id
}

function insertNewComponent(draft: IComponentsState, newComponent: IComponentInfo) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    componentList.push(newComponent)
  }
  else {
    componentList.splice(index + 1, 0, newComponent)
  }
}

export {
  getNextSelectedId,
  insertNewComponent
}
