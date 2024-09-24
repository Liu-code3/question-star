import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '@/components/QuestionComponent'

export interface ComponentInfoType {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export interface IComponentsState {
  componentList: ComponentInfoType[]
}

const INIT_STATE: IComponentsState = {
  componentList: []
}

const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents(_: IComponentsState, action: PayloadAction<IComponentsState>) {
      return action.payload
    }
  }
})

export const { resetComponents } = componentSlice.actions
export default componentSlice.reducer
