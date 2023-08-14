import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ItemListResult, ItemQuery, ItemResult } from 'src/Types/items.type'
import { baseUrl } from 'src/constants/base-url.constants'
import { omitBy, isUndefined } from 'lodash'

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({
    baseUrl
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

export const { useGetItemListQuery, useGetItemQuery } = itemApi
