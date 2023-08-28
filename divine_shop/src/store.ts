import { configureStore } from '@reduxjs/toolkit'
import { ItemsApiPath, ItemsApi, ItemsApiMiddleware } from './utils/apis/items.api'
import { ItemsSlice } from './utils/slices/items.slice'
import { UserApi, UserApiMiddleware, UserApiPath } from './utils/apis/user.api'
import { UserSlice } from './utils/slices/user.slice'
import { OrdersApi, OrdersApiMiddleware, OrdersApiPath } from './utils/apis/order.api'
import { FavorateApi, FavorateApiMiddleware, FavorateApiPath } from './utils/apis/favorate.api'

export const store = configureStore({
  reducer: {
    ItemsSliceName: ItemsSlice,
    [ItemsApiPath]: ItemsApi,
    UserSliceName: UserSlice,
    [UserApiPath]: UserApi,
    [OrdersApiPath]: OrdersApi,
    [FavorateApiPath]: FavorateApi
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      ItemsApiMiddleware,
      UserApiMiddleware,
      OrdersApiMiddleware,
      FavorateApiMiddleware
    )
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
