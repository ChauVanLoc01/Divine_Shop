import { SuccessResponse } from './responses.type'

export type User = {
  user_id: string
  name: string
  email: string
  avatar: string
  point: number
  role: 'user' | 'admin'
}

export type Login = SuccessResponse<{
  accessToken: string
}>

export type Register = Login

export type UserProfile = SuccessResponse<User>

export type ChangePassword = {
  current_password: string
  new_password: string
}
