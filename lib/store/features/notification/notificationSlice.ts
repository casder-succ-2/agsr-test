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
		clearNotifications: create.reducer(state => {
			state.count = 0
		}),
	}),
	selectors: {
		selectNotificationCount: state => state.count,
	},
})

export const { increment, clearNotifications } = notificationSlice.actions

export const { selectNotificationCount } = notificationSlice.selectors
