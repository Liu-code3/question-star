import { configureStore } from '@reduxjs/toolkit'
import type { IUserReducerType } from '@/store/userReducer.ts'
import userReducer from '@/store/userReducer.ts'
import type { IComponentsState } from '@/store/componentsReducer'
import componentsReducer from '@/store/componentsReducer'

export interface IState {
  user: IUserReducerType
  components: IComponentsState
}

const store = configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer
  }
})

export default store
