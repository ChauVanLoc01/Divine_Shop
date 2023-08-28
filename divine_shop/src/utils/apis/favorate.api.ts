import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from 'src/constants/base-url.constant'
import { Route } from 'src/constants/route.constant'
import { WorkingWithLocalStorage as ls } from '../local-storage'
import { CreateFavorateItem, FavorateItem, FavorateItemList, FavorateQuery } from 'src/Types/favorates.type'
import { SuccessResponse } from 'src/Types/responses.type'

const favorate_api = createApi({
  reducerPath: 'FavorateApi',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  tagTypes: ['Favorates'],
  endpoints: (build) => ({
    createFavorate: build.mutation<SuccessResponse<FavorateItem>, CreateFavorateItem>({
      query: (agr) => {
        return {
          url: Route.favorates,
          method: 'POST',
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          },
          body: agr
        }
      },
      invalidatesTags: () => [{ type: 'Favorates', id: 'All' }]
    }),
    getAllFavorate: build.query<SuccessResponse<FavorateItemList>, FavorateQuery>({
      query: (params) => {
        return {
          url: Route.favorates,
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          },
          params
        }
      },
      providesTags: () => [{ type: 'Favorates', id: 'All' }]
    }),
    getFavorateDetail: build.query<SuccessResponse<FavorateItem>, string>({
      query: (item_id) => {
        return {
          url: `${Route.favorates}/${item_id}`,
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          }
        }
      }
    }),
    deleteFavorate: build.mutation<SuccessResponse<{}>, string>({
      query: (slug) => {
        return {
          url: `${Route.favorates}/${slug}`,
          method: 'DELETE',
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          }
        }
      },
      invalidatesTags: () => [{ type: 'Favorates', id: 'All' }]
    })
  })
})

export const FavorateApiPath = favorate_api.reducerPath

export const FavorateApi = favorate_api.reducer

export const FavorateApiMiddleware = favorate_api.middleware

export const {
  useCreateFavorateMutation,
  useGetAllFavorateQuery,
  useGetFavorateDetailQuery,
  useDeleteFavorateMutation
} = favorate_api
