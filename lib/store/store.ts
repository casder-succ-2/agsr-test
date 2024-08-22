import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { systemSlice } from './features/system/systemSlice'
import { accountSlice } from './features/account/accountSlice'
import { notificationSlice } from './features/notification/notificationSlice'

const rootReducer = combineSlices(accountSlice, systemSlice, notificationSlice)

export type RootState = ReturnType<typeof rootReducer>

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
