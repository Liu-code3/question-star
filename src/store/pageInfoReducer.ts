import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface IPageInfoState {
  title: string
  desc?: string
  js?: string
  css?: string
}

const INIT_STATE: IPageInfoState = {
  title: '',
  desc: '',
  js: '',
  css: ''
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo(_, action: PayloadAction<IPageInfoState>) {
      return action.payload
    },
    // 修改问卷标题
    changePageTitle:  (state: IPageInfoState, action: PayloadAction<string>) => {
      state.title = action.payload
    }
  }
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
