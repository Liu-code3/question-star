import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'
import type { ComponentPropsType } from '@/components/QuestionComponent'

interface IComponentInfo {
  fe_id: string
  type: string
  title: string
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
    resetComponents(_: IComponentsState, action: PayloadAction<IComponentsState>) {
      return action.payload
    },
    // 修改 selectedId
    changeSelectedId: produce((darft: IComponentsState, action: PayloadAction<string>) => {
      darft.selectedId = action.payload
    }),
    // 添加新组件
    addComponent: produce((darft: IComponentsState, action: PayloadAction<IComponentInfo>) => {
      const newComponent = action.payload
      const { selectedId, componentList } = darft
      const index = componentList.findIndex(c => c.fe_id === selectedId)

      if (index < 0) {
        componentList.push(newComponent)
      }
      else {
        componentList.splice(index + 1, 0, newComponent)
      }
    })
  }
})

export const { resetComponents, changeSelectedId,  addComponent } = componentSlice.actions
export default componentSlice.reducer

export type {
  IComponentInfo,
  IComponentsState
}
