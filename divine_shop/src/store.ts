import { configureStore } from '@reduxjs/toolkit'
import { ItemsApiPath, ItemsApi, ItemsApiMiddleware } from './utils/apis/items.api'
import { ItemsSlice } from './utils/slices/items.slice'

export const store = configureStore({
  reducer: {
    ItemsSliceName: ItemsSlice,
    [ItemsApiPath]: ItemsApi
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(ItemsApiMiddleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
