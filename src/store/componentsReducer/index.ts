import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { getNextSelectedId } from './utils.ts'
import type { ComponentPropsType } from '@/components/QuestionComponent'

interface IComponentInfo {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  props: ComponentPropsType
}

interface IComponentsState {
  selectedId: string
  componentList: IComponentInfo[]
}

const INIT_STATE: IComponentsState = {
  selectedId: '',
  componentList: []
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
      (darft: IComponentsState, action: PayloadAction<string>) => {
        darft.selectedId = action.payload
      }
    ),
    // 添加新组件
    addComponent: produce(
      (darft: IComponentsState, action: PayloadAction<IComponentInfo>) => {
        const newComponent = action.payload
        const { selectedId, componentList } = darft
        const index = componentList.findIndex(c => c.fe_id === selectedId)

        if (index < 0) {
          componentList.push(newComponent)
        }
        else {
          componentList.splice(index + 1, 0, newComponent)
        }
      }
    ),
    // 修改组件信息
    changeComponentProps: produce(
      (darft: IComponentsState, action: PayloadAction<{ fe_id: string, newProps: Partial<ComponentPropsType> }>) => {
        const { fe_id, newProps } = action.payload
        // 当前需要修改属性的这个组件
        const curComp = darft.componentList.find(c => c.fe_id === fe_id)
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
      (darft: IComponentsState) => {
        const { componentList, selectedId } = darft

        // 重新计算  selectedId
        darft.selectedId = getNextSelectedId(selectedId, componentList)

        const delIndex = componentList.findIndex(c => c.fe_id === selectedId)
        if (delIndex < 0)
          return
        componentList.splice(delIndex, 1)
      }
    ),
    // 隐藏/显示 组件
    changeComponentHidden: produce(
      (darft: IComponentsState, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
        const { componentList = [] } = darft
        const { fe_id, isHidden } = action.payload

        darft.selectedId = getNextSelectedId(fe_id, componentList)

        const curComp = darft.componentList.find(c => c.fe_id === fe_id)
        if (curComp)
          curComp.isHidden = isHidden
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
  changeComponentHidden
} = componentSlice.actions
export default componentSlice.reducer

export type {
  IComponentInfo,
  IComponentsState
}
