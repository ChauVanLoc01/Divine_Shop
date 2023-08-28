import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { omit } from 'lodash'
import { Item } from 'src/Types/items.type'
import { WorkingWithLocalStorage as ls } from '../local-storage'
import { WorkingWithSessionStorage as ss } from '../session-storage'

export type BuyItem = Item & {
  buy_amount: number
}

type ItemSlice = {
  viewed: Item[]
  cart: BuyItem[]
}

const initialState: ItemSlice = {
  viewed: ss.get('viewed') ? JSON.parse(ss.get('viewed') as string) : [],
  cart: ls.get('item_in_cart') ? JSON.parse(ls.get('item_in_cart') as string) : []
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
      ss.update('viewed', JSON.stringify(state.viewed))
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
      ls.update('item_in_cart', JSON.stringify(state.cart))
    },
    deleteItemsFromCart: (state, action: PayloadAction<{ item_id: string; amount: number }>) => {
      const index = state.cart.findIndex((e) => e.item_id === action.payload.item_id)
      state.cart[index].buy_amount -= action.payload.amount
      if (state.cart[index].buy_amount === 0) {
        state.cart.splice(index, 1)
      }
      ls.update('item_in_cart', JSON.stringify(state.cart))
    },
    updateItemsFromCart: (state, action: PayloadAction<Item[]>) => {
      state.cart.forEach((e) => {
        const found = action.payload.find((n) => n.item_id === e.item_id)
        return found ? { ...found, buy_amount: e.buy_amount } : e
      })
    },
    resetItemInCart: (
      state,
      action: PayloadAction<
        {
          item_id: string
          buy_amount: number
        }[]
      >
    ) => {
      action.payload.forEach((e) => {
        const index = state.cart.findIndex((ic) => ic.item_id === e.item_id)
        state.cart.splice(index, 1)
      })
      ls.set('item_in_cart', JSON.stringify(state.cart))
    },
    buyAgain: (state, action: PayloadAction<(BuyItem & { replace?: boolean })[]>) => {
      const result = action.payload.map((e) => {
        const found = state.cart.find((a) => a.item_id === e.item_id)
        if (found) {
          return {
            ...found,
            buy_amount: e.buy_amount + found.buy_amount
          }
        }
        return e
      })
      state.cart = [...state.cart, ...result]
      ls.update('item_in_cart', JSON.stringify(state.cart))
    }
  }
})

export const {
  addItemsIntoView,
  addItemsIntoCart,
  deleteItemsFromCart,
  updateItemsFromCart,
  resetItemInCart,
  buyAgain
} = itemsSlice.actions

export const ItemsSlice = itemsSlice.reducer

export const ItemsSliceName = itemsSlice.name
