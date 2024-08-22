import type { User } from '@prisma/client'

import {
  type ChangePassword,
  type ContactInfo,
  type PersonalInfo,
  changePassword,
  fetchAccount,
  login,
  logout,
  updateContactInfo,
  updatePersonalInfo,
} from './accountApi'
import { createAppSlice } from '@/lib/store/createAppSlice'

import { removeAuthCookie } from '@/lib/cookies'

interface State {
  status: 'idle' | 'loading' | 'failed'
  user: Partial<User> | null
  error: string | null
}

const initialState: State = {
  status: 'idle',
  user: null,
  error: null,
}

export const accountSlice = createAppSlice({
  name: 'account',
  initialState,
  reducers: create => ({
    logoutAsync: create.asyncThunk(
      async () => {
        const response = await logout()

        return response
      },
      {
        fulfilled: (state) => {
          state.user = null

          removeAuthCookie('auth_token')
        },
        rejected: (state, action) => {
          state.error = action.error.message as string
        },
      },
    ),
    getAccoutnAsync: create.asyncThunk(
      async () => {
        const response = await fetchAccount()

        return response
      },
      {
        pending: (state) => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.user = action.payload.user
        },
        rejected: (state) => {
          state.status = 'failed'
        },
      },
    ),
    signIn: create.asyncThunk(
      async (body: { email: string, password: string }) => {
        const response = await login(body)

        return response
      },
      {
        fulfilled: (state, action) => {
          state.user = action.payload.user
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message as string
        },
      },
    ),
    updatePersonalInfoAsync: create.asyncThunk(
      async (body: PersonalInfo) => {
        const response = await updatePersonalInfo(body)

        return response
      },
      {
        pending: (state) => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.user = action.payload.user
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message as string
        },
      },
    ),
    updateContactInfoAsync: create.asyncThunk(
      async (body: ContactInfo) => {
        const response = await updateContactInfo(body)

        return response
      },
      {
        pending: (state) => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.status = 'idle'

          state.user = action.payload.user
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message as string
        },
      },
    ),
    changePasswordAsync: create.asyncThunk(
      async (body: ChangePassword) => {
        const response = await changePassword(body)

        return response
      },
      {
        pending: (state) => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.user = action.payload.user
        },
        rejected: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message as string
        },
      },
    ),
  }),
  selectors: {
    selectError: state => state.error,
    selectAccount: state => state.user,
    selectStatus: state => state.status,
  },
})

export const {
  signIn,
  getAccoutnAsync,
  changePasswordAsync,
  updatePersonalInfoAsync,
  updateContactInfoAsync,
  logoutAsync,
} = accountSlice.actions

export const { selectAccount, selectStatus, selectError } = accountSlice.selectors
