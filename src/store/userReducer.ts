import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface IUserState {
  username: string
  nickname: string
}

const initialState: IUserState = { username: '', nickname: '' }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(_: IUserState, action: PayloadAction<IUserState>) {
      return action.payload
    },
    clearUserInfo() {
      return initialState
    }
  }
})

export const { setUserInfo, clearUserInfo } = userSlice.actions
export default userSlice.reducer
