import { configureStore } from '@reduxjs/toolkit'
import { ItemsApiPath, ItemsApi, ItemsApiMiddleware } from './utils/apis/items.api'
import { ItemsSlice } from './utils/slices/items.slice'
import { UserApi, UserApiMiddleware, UserApiPath } from './utils/apis/user.api'
import { UserSlice } from './utils/slices/user.slice'

export const store = configureStore({
  reducer: {
    ItemsSliceName: ItemsSlice,
    [ItemsApiPath]: ItemsApi,
    UserSliceName: UserSlice,
    [UserApiPath]: UserApi
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(ItemsApiMiddleware, UserApiMiddleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
