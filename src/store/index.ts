import { configureStore } from '@reduxjs/toolkit'
import type { StateWithHistory } from 'redux-undo'
import undoable, { excludeAction } from 'redux-undo'
import type { IUserState } from '@/store/userReducer.ts'
import userReducer from '@/store/userReducer.ts'
import type { IComponentsState } from '@/store/componentsReducer'
import componentsReducer from '@/store/componentsReducer'
import type { IPageInfoState } from '@/store/pageInfoReducer.ts'
import pageInfoReducer from '@/store/pageInfoReducer.ts'

export interface IState {
  user: IUserState
  components: StateWithHistory<IComponentsState>
  pageInfo: IPageInfoState
}

const store = configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20, // 限制undo20步
      filter: excludeAction([
        'components/resetComponent',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent'
      ]) // 忽略undo的action
    }),
    pageInfo: pageInfoReducer
  }
})

export default store
