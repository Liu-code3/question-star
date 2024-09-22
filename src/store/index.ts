import { configureStore } from '@reduxjs/toolkit'
import type { IUserReducerType } from '@/store/userReducer.ts'
import userReducer from '@/store/userReducer.ts'

export interface IState {
  user: IUserReducerType
}

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export default store
