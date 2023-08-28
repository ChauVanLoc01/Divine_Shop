import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ItemListResult, ItemQuery, ItemResult } from 'src/Types/items.type'
import { baseUrl } from 'src/constants/base-url.constant'

const ItemApi = createApi({
  reducerPath: 'ItemApi',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: (build) => ({
    getItemList: build.query<ItemListResult, ItemQuery>({
      query: (params) => {
        return {
          url: 'items',
          params
        }
      }
    }),
    getItem: build.query<ItemResult, string>({
      query: (slug) => {
        return {
          url: `items/${slug}`
        }
      }
    })
  })
})

export const { useGetItemListQuery, useGetItemQuery } = ItemApi

export const ItemsApiMiddleware = ItemApi.middleware

export const ItemsApiPath = ItemApi.reducerPath

export const ItemsApi = ItemApi.reducer
