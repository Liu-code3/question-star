import { configureStore } from '@reduxjs/toolkit'
import type { IUserState } from '@/store/userReducer.ts'
import userReducer from '@/store/userReducer.ts'
import type { IComponentsState } from '@/store/componentsReducer'
import componentsReducer from '@/store/componentsReducer'
import type { IPageInfoState } from '@/store/pageInfoReducer.ts'
import pageInfoReducer from "@/store/pageInfoReducer.ts";

export interface IState {
  user: IUserState
  components: IComponentsState
  pageInfo: IPageInfoState
}

const store = configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReducer
  }
})

export default store
