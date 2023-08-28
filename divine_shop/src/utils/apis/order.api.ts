import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order, OrderAgrument, OrderDetail, OrderQuery, Orders } from 'src/Types/order.type'
import { baseUrl } from 'src/constants/base-url.constant'
import { Route } from 'src/constants/route.constant'
import { WorkingWithLocalStorage as ls } from '../local-storage'
import { SuccessResponse } from 'src/Types/responses.type'

const OrderApi = createApi({
  reducerPath: 'OrderApi',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: (build) => ({
    order: build.mutation<SuccessResponse<Order>, OrderAgrument>({
      query: (body) => {
        return {
          url: Route.orders,
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          },
          method: 'POST',
          body
        }
      }
    }),
    getOrderList: build.query<SuccessResponse<Orders>, OrderQuery>({
      query: (params) => {
        return {
          url: Route.orders,
          params,
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          }
        }
      }
    }),
    getOrder: build.query<SuccessResponse<OrderDetail>, string>({
      query: (slug) => {
        return {
          url: `${Route.orders}/${slug}`,
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          }
        }
      }
    })
  })
})

export const { useOrderMutation, useGetOrderListQuery, useGetOrderQuery, usePrefetch } = OrderApi

export const OrdersApiMiddleware = OrderApi.middleware

export const OrdersApiPath = OrderApi.reducerPath

export const OrdersApi = OrderApi.reducer
