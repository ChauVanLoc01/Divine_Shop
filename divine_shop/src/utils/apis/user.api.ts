import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Login, Register, UserProfile } from 'src/Types/user.type'
import { baseUrl } from 'src/constants/base-url.constant'
import { LoginSchemaType } from '../schemas/login.schema'
import { Route } from 'src/constants/route.constant'
import { RegisterSchemaType } from '../schemas/register.schema'
import { WorkingWithLocalStorage } from '../local-storage'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      if ([Route.logout, Route.my_profile, Route.change_password].includes(endpoint)) {
        headers.set(
          'Authorization',
          WorkingWithLocalStorage.get('access_token') ? (WorkingWithLocalStorage.get('access_token') as string) : ''
        )
      }
      return headers
    }
  }),
  endpoints: (build) => ({
    login: build.mutation<Login, LoginSchemaType>({
      query: (arg) => {
        return {
          url: Route.login,
          method: 'POST',
          body: arg
        }
      }
    }),
    register: build.mutation<Register, Omit<RegisterSchemaType, 'confirm_password'> & { name: string }>({
      query: (arg) => {
        return {
          url: Route.register,
          method: 'POST',
          body: arg
        }
      }
    }),
    profile: build.query<UserProfile, void>({
      query: () => {
        return {
          url: Route.my_profile
        }
      }
    })
  })
})

export const UserApiPath = userApi.reducerPath

export const UserApi = userApi.reducer

export const UserApiMiddleware = userApi.middleware

export const { useLoginMutation, useRegisterMutation, useProfileQuery } = userApi
