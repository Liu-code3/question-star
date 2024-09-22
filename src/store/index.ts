import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/store/userReducer.ts'

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export default store
