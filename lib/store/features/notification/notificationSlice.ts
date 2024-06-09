import { createAppSlice } from '@/lib/store/createAppSlice'

type State = {
	count: number
}

const initialState: State = {
	count: 0,
}

export const notificationSlice = createAppSlice({
	name: 'notifications',
	initialState,
	reducers: create => ({
		increment: create.reducer(state => {
			state.count = 4
		}),
	}),
	selectors: {
		selectNotificationCount: state => state.count,
	},
})

export const { increment } = notificationSlice.actions

export const { selectNotificationCount } = notificationSlice.selectors
