import { configureStore } from '@reduxjs/toolkit'
import { itemApi } from './utils/apis/items.api'

export const store = configureStore({
  reducer: {
    [itemApi.reducerPath]: itemApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(itemApi.middleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
