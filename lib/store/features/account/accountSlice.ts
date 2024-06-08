import { User } from '@prisma/client'

import { createAppSlice } from '@/lib/store/createAppSlice'

import { fetchAccount, login } from './accountApi'

type State = {
	status: 'idle' | 'loading' | 'failed'
	user: Partial<User> | null
	error: string | null
}

const initialState: State = {
	status: 'idle',
	user: null,
	error: null
}

export const accountSlice = createAppSlice({
	name: 'account',
	initialState,
	reducers: create => ({
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
				rejected: (state) => {
					state.status = 'failed'
				}
			}
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
				}
			}
		)
	}),
	selectors: {
		selectAccount: accoutn => accoutn.user,
		selectStatus: accoutn => accoutn.status,
		selectError: accoutn => accoutn.error
	}
})

export const { getAccoutnAsync, signIn } = accountSlice.actions

export const { selectAccount, selectStatus, selectError } =
	accountSlice.selectors
