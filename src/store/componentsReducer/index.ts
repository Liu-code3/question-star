import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
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
    changeSelectedId: (state: IComponentsState, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    // 添加新组件
    addComponent: (state: IComponentsState, action: PayloadAction<IComponentInfo>) => {
      const newComponent = action.payload
      insertNewComponent(state, newComponent)
    },
    // 修改组件信息
    changeComponentProps: (state: IComponentsState, action: PayloadAction<{ fe_id: string, newProps: Partial<ComponentPropsType> }>) => {
      const { fe_id, newProps } = action.payload
      // 当前需要修改属性的这个组件
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps
        }
      }
    },
    // 删除组件
    removeSelectedComponent: (state: IComponentsState) => {
      const { componentList, selectedId } = state

      // 重新计算  selectedId
      state.selectedId = getNextSelectedId(selectedId, componentList)

      const delIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (delIndex < 0)
        return
      componentList.splice(delIndex, 1)
    },
    // 隐藏/显示 组件
    changeComponentHidden: (state: IComponentsState, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
      const { componentList = [] } = state
      const { fe_id, isHidden } = action.payload
      // 重新计算  selectId
      state.selectedId = isHidden ? getNextSelectedId(fe_id, componentList) : fe_id

      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp)
        curComp.isHidden = isHidden
    },
    // 锁定/解锁 组件
    changeComponentLocked: (state: IComponentsState, action: PayloadAction<{ fe_id: string }>) => {
      const { fe_id } = action.payload
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },
    // 复制组件
    copyComponent: (state: IComponentsState) => {
      const { selectedId, componentList } = state
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (!selectedComponent)
        return

      state.copiedComponent = deepMerge(selectedComponent)
    },
    // 粘贴组件
    pasteComponent: (state: IComponentsState) => {
      const { copiedComponent } = state
      if (!copiedComponent)
        return

      copiedComponent.fe_id = nanoid()
      insertNewComponent(state, copiedComponent)
    },

    // 选中上一个
    selectPrevComponent: (state: IComponentsState) => {
      const { selectedId, componentList } = state
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex <= 0)
        return

      state.selectedId = componentList[selectedIndex - 1].fe_id
    },

    // 选中下一个
    selectNextComponent: (state: IComponentsState) => {
      const { selectedId, componentList } = state
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

      if (selectedIndex < 0)
        return

      if (selectedIndex === componentList.length - 1)
        return

      state.selectedId = componentList[selectedIndex + 1].fe_id
    },

    // 修改组件标题
    changeComponentTitle: (state: IComponentsState, action: PayloadAction<{ fe_id: string, title: string }>) => {
      const { componentList } = state
      const { fe_id, title } = action.payload
      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp)
        curComp.title = title
    },
    // 移动组件
    moveComponent: (state: IComponentsState, action: PayloadAction<{ oldIndex: number, newIndex: number }>) => {
      const { componentList: curComponentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    }
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
  changeComponentTitle,
  moveComponent
} = componentSlice.actions
export default componentSlice.reducer

export type {
  IComponentInfo,
  IComponentsState
}
