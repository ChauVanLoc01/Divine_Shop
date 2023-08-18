import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ItemListResult, ItemQuery, ItemResult } from 'src/Types/items.type'
import { omitBy, isUndefined } from 'lodash'

const ItemApi = createApi({
  reducerPath: 'ItemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASEURL
  }),
  endpoints: (build) => ({
    getItemList: build.query<ItemListResult, ItemQuery>({
      query: (query) => {
        return {
          url: 'items',
          params: { ...omitBy(query, isUndefined) }
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
