import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface IUserReducerType {
  username: string
  nickname: string
}

const initialState: IUserReducerType = { username: '', nickname: '' }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(_: IUserReducerType, action: PayloadAction<IUserReducerType>) {
      return action.payload
    },
    clearUserInfo() {
      return initialState
    }
  }
})

export const { setUserInfo, clearUserInfo } = userSlice.actions
export default userSlice.reducer
