import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ChangePassword, Login, Register, User, UserProfile } from 'src/Types/user.type'
import { LoginSchemaType } from '../schemas/login.schema'
import { Route } from 'src/constants/route.constant'
import { RegisterSchemaType } from '../schemas/register.schema'
import { WorkingWithLocalStorage as ls } from '../local-storage'
import { baseUrl } from 'src/constants/base-url.constant'
import { ProfileSchemaType } from '../schemas/profile.schema'

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
          url: Route.my_profile,
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          }
        }
      }
    }),
    updateProfile: build.mutation<UserProfile, Partial<ProfileSchemaType>>({
      query: (body) => {
        return {
          url: Route.my_profile,
          method: 'PUT',
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          },
          body
        }
      }
    }),
    updateAvatar: build.mutation<User, FormData>({
      query: (body) => {
        return {
          url: Route.my_profile,
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data;',
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          },
          body
        }
      }
    }),
    changePassword: build.mutation<{}, ChangePassword>({
      query: (body) => {
        return {
          url: Route.change_password,
          method: 'PUT',
          headers: {
            Authorization: ls.get('access_token') ? (ls.get('access_token') as string) : ''
          },
          body
        }
      }
    })
  })
})

export const UserApiPath = userApi.reducerPath

export const UserApi = userApi.reducer

export const UserApiMiddleware = userApi.middleware

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useUpdateAvatarMutation
} = userApi
