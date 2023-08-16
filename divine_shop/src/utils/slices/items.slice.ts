import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Item } from 'src/Types/items.type'

const initialState: Item[] = []

const itemsSlice = createSlice({
  name: 'ItemsSlice',
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<Item>) => {
      // const item = state.find((e) => e.item_id === action.payload.item_id)
      // if (!item) {
      state.push(action.payload)
      // }
    }
  }
})

export const { addItems } = itemsSlice.actions

export const ItemsSlice = itemsSlice.reducer

export const ItemsSliceName = itemsSlice.name
