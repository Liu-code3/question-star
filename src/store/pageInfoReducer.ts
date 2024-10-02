import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'

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
    changePageTitle: produce(
      (draft: IPageInfoState, action: PayloadAction<string>) => {
        draft.title = action.payload
      }
    )
  }
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
