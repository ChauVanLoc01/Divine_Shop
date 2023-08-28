import { User } from 'src/Types/user.type'
import { WorkingWithLocalStorage as ls } from '../local-storage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type UserStateSlice = {
  user: User | undefined
  access_token: string | undefined
  isOpen: {
    open: boolean
    type?: 'login' | 'register'
  }
  jump: boolean
}

const initialState: UserStateSlice = {
  user: ls.get('user') ? (JSON.parse(ls.get('user') as string) as User) : undefined,
  access_token: ls.get('access_token') ? (ls.get('access_token') as string) : undefined,
  isOpen: {
    open: false,
    type: undefined
  },
  jump: true
}

const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    save_user: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      ls.set('user', JSON.stringify(action.payload))
    },
    save_access_token: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload
      ls.set('access_token', action.payload)
    },
    delete_ls: (state, action: PayloadAction<('user' | 'access_token')[]>) => {
      action.payload.forEach((key) => {
        ls.delete(key)
        if (key === 'access_token') {
          state.access_token = undefined
        }
        if (key === 'user') {
          state.user = undefined
        }
      })
    },
    update_user: (state, action: PayloadAction<User>) => {
      ls.delete('user')
      state.user = action.payload
      ls.set('user', JSON.stringify(action.payload))
    },
    setIsOpen: (
      state,
      action: PayloadAction<{
        open: boolean
        type?: 'login' | 'register'
      }>
    ) => {
      state.isOpen = {
        ...state.isOpen,
        ...action.payload
      }
    },
    setJump: (state, action: PayloadAction<boolean>) => {
      state.jump = action.payload
    }
  }
})

export const UserSliceName = userSlice.name

export const UserSlice = userSlice.reducer

export const { save_user, save_access_token, setIsOpen, delete_ls, update_user, setJump } = userSlice.actions
