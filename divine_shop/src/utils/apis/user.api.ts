import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Login, Register } from 'src/Types/user.type'
import { baseUrl } from 'src/constants/base-url.constant'
import { LoginSchemaType } from '../schemas/login.schema'
import { Route } from 'src/constants/route.constant'
import { RegisterSchemaType } from '../schemas/register.schema'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl
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
    register: build.mutation<Register, RegisterSchemaType & { name: string }>({
      query: (arg) => {
        return {
          url: Route.register,
          method: 'POST',
          body: arg
        }
      }
    })
  })
})

export const UserApiPath = userApi.reducerPath

export const UserApi = userApi.reducer

export const UserApiMiddleware = userApi.middleware

export const { useLoginMutation, useRegisterMutation } = userApi
