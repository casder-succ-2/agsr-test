import { User } from '@prisma/client'

import { createAppSlice } from '@/lib/store/createAppSlice'

import {
	fetchAccount,
	login,
	updatePersonalInfo,
	updateContactInfo,
	changePassword,
	type PersonalInfo,
	type ContactInfo,
	type ChangePassword,
} from './accountApi'
import { removeAuthCookie } from '@/lib/cookies'
import { PayloadAction } from '@reduxjs/toolkit'

type State = {
	status: 'idle' | 'loading' | 'failed'
	user: Partial<User> | null
	error: string | null
}

const initialState: State = {
	status: 'loading',
	user: null,
	error: null,
}

export const accountSlice = createAppSlice({
	name: 'account',
	initialState,
	reducers: create => ({
		logout: create.reducer(state => {
			state.user = null
			state.status = 'idle'

			removeAuthCookie('auth_token')
		}),
		changeStatus: create.reducer((state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
			state.status = action.payload
		}),
		getAccoutnAsync: create.asyncThunk(
			async () => {
				const response = await fetchAccount()

				return response
			},
			{
				pending: state => {
					state.status = 'loading'
				},
				fulfilled: (state, action) => {
					state.status = 'idle'
					state.user = action.payload.user
				},
				rejected: state => {
					state.status = 'failed'
				},
			},
		),
		signIn: create.asyncThunk(
			async (body: { email: string; password: string }) => {
				const response = await login(body)

				return response
			},
			{
				pending: state => {
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
		updatePersonalInfoAsync: create.asyncThunk(
			async (body: PersonalInfo) => {
				const response = await updatePersonalInfo(body)

				return response
			},
			{
				pending: state => {
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
				pending: state => {
					state.status = 'loading'
				},
				fulfilled: (state, action) => {
					state.status = 'idle'
					console.log(action.payload)

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
				pending: state => {
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
	logout,
	changeStatus,
} = accountSlice.actions

export const { selectAccount, selectStatus, selectError } =
	accountSlice.selectors
