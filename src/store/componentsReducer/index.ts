import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { nanoid } from 'nanoid'
import { getNextSelectedId, insertNewComponent } from './utils.ts'
import type { ComponentPropsType } from '@/components/QuestionComponent'
import { deepMerge } from '@/utils/cloneDeep.ts'

interface IComponentInfo {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

interface IComponentsState {
  selectedId: string
  componentList: IComponentInfo[]
  copiedComponent: IComponentInfo | null
}

const INIT_STATE: IComponentsState = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
}

const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (_: IComponentsState, action: PayloadAction<IComponentsState>) => {
      return action.payload
    },
    // 修改 selectedId
    changeSelectedId: produce(
      (draft: IComponentsState, action: PayloadAction<string>) => {
        draft.selectedId = action.payload
      }
    ),
    // 添加新组件
    addComponent: produce(
      (draft: IComponentsState, action: PayloadAction<IComponentInfo>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),
    // 修改组件信息
    changeComponentProps: produce(
      (draft: IComponentsState, action: PayloadAction<{ fe_id: string, newProps: Partial<ComponentPropsType> }>) => {
        const { fe_id, newProps } = action.payload
        // 当前需要修改属性的这个组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps
          }
        }
      }
    ),
    // 删除组件
    removeSelectedComponent: produce(
      (draft: IComponentsState) => {
        const { componentList, selectedId } = draft

        // 重新计算  selectedId
        draft.selectedId = getNextSelectedId(selectedId, componentList)

        const delIndex = componentList.findIndex(c => c.fe_id === selectedId)
        if (delIndex < 0)
          return
        componentList.splice(delIndex, 1)
      }
    ),
    // 隐藏/显示 组件
    changeComponentHidden: produce(
      (draft: IComponentsState, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
        const { componentList = [] } = draft
        const { fe_id, isHidden } = action.payload
        // 重新计算  selectId
        draft.selectedId = isHidden ? getNextSelectedId(fe_id, componentList) : fe_id

        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp)
          curComp.isHidden = isHidden
      }
    ),
    // 锁定/解锁 组件
    changeComponentLocked: produce(
      (draft: IComponentsState, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    // 复制组件
    copyComponent: produce(
      (draft: IComponentsState) => {
        const { selectedId, componentList } = draft
        const selectedComponent = componentList.find(c => c.fe_id === selectedId)
        if (!selectedComponent)
          return

        draft.copiedComponent = deepMerge(selectedComponent)
      }
    ),
    // 粘贴组件
    pasteComponent: produce(
      (draft: IComponentsState) => {
        const { copiedComponent } = draft
        if (!copiedComponent)
          return

        copiedComponent.fe_id = nanoid()
        insertNewComponent(draft, copiedComponent)
      }
    ),

    // 选中上一个
    selectPrevComponent: produce(
      (draft: IComponentsState) => {
        const { selectedId, componentList } = draft
        const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

        if (selectedIndex <= 0)
          return

        draft.selectedId = componentList[selectedIndex - 1].fe_id
      }
    ),

    // 选中下一个
    selectNextComponent: produce(
      (draft: IComponentsState) => {
        const { selectedId, componentList } = draft
        const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

        if (selectedIndex < 0)
          return

        if (selectedIndex === componentList.length - 1)
          return

        draft.selectedId = componentList[selectedIndex + 1].fe_id
      }
    ),

    // 修改组件标题
    changeComponentTitle: produce(
      (draft: IComponentsState, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { componentList } = draft
        const { fe_id, title } = action.payload
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp)
          curComp.title = title
      }
    )
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  changeComponentLocked,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle
} = componentSlice.actions
export default componentSlice.reducer

export type {
  IComponentInfo,
  IComponentsState
}
