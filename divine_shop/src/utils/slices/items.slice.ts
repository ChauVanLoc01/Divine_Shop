import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { omit } from 'lodash'
import { Item } from 'src/Types/items.type'

export type BuyItem = Item & {
  buy_amount: number
}

type ItemSlice = {
  viewed: Item[]
  cart: BuyItem[]
}

const initialState: ItemSlice = {
  viewed: [],
  cart: []
}

const itemsSlice = createSlice({
  name: 'ItemsSlice',
  initialState,
  reducers: {
    addItemsIntoView: (state, action: PayloadAction<Item>) => {
      const item = state.viewed.find((e) => e.item_id === action.payload.item_id)
      if (!item) {
        state.viewed.push(action.payload)
      }
    },
    addItemsIntoCart: (state, action: PayloadAction<BuyItem & { replace?: boolean }>) => {
      const index = state.cart.findIndex((e) => e.item_id === action.payload.item_id)
      if (index === -1) {
        state.cart.push({ ...omit(action.payload, ['replace']) })
      } else {
        if (action.payload.replace) {
          state.cart[index].buy_amount = action.payload.buy_amount
        } else {
          state.cart[index].buy_amount += action.payload.buy_amount
        }
      }
    },
    deleteItemsFromCart: (state, action: PayloadAction<{ item_id: string; amount: number }>) => {
      const index = state.cart.findIndex((e) => e.item_id === action.payload.item_id)
      state.cart[index].buy_amount -= action.payload.amount
      if (state.cart[index].buy_amount === 0) {
        state.cart.splice(index, 1)
      }
    },
    updateItemsFromCart: (state, action: PayloadAction<Item[]>) => {
      const updatedCart = state.cart.map((e) => {
        const new_data = action.payload.find((n) => n.item_id === e.item_id)
        if (new_data) {
          return { ...new_data, buy_amount: e.buy_amount }
        }
        return e
      })
      state.cart = updatedCart
    }
  }
})

export const { addItemsIntoView, addItemsIntoCart, deleteItemsFromCart, updateItemsFromCart } = itemsSlice.actions

export const ItemsSlice = itemsSlice.reducer

export const ItemsSliceName = itemsSlice.name
