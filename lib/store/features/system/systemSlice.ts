import type { AutomatedInformationSystem } from '@prisma/client'

import { createSystem, fetchSystemList } from './systemApi'
import { createAppSlice } from '@/lib/store/createAppSlice'

interface State {
  status: 'idle' | 'loading' | 'failed'
  count: number
  list: AutomatedInformationSystem[] | null
  error: string | null
}

const initialState: State = {
  list: null,
  count: 0,
  error: null,
  status: 'idle',
}

export const systemSlice = createAppSlice({
  name: 'system',
  initialState,
  reducers: create => ({
    getListAsync: create.asyncThunk(
      async (params: {
        page: number
        perPage: number
        searchValue: string
      }) => {
        const response = await fetchSystemList(params)

        return response
      },
      {
        pending: (state) => {
          state.status = 'loading'
        },
        fulfilled: (state, action) => {
          state.status = 'idle'
          state.list = action.payload.list
          state.count = action.payload.count
        },
        rejected: (state) => {
          state.status = 'failed'
        },
      },
    ),
    createSystemAsycn: create.asyncThunk(
      async () => {
        const response = await createSystem()

        return response
      },
      {
        pending: (state) => {
          state.status = 'loading'
        },
        fulfilled: (state) => {
          state.status = 'idle'
        },
        rejected: (state) => {
          state.status = 'failed'
        },
      },
    ),
  }),
  selectors: {
    selectList: state => state.list,
    selectCount: state => state.count,
    selectStatus: state => state.status,
    selectError: state => state.error,
  },
})

export const { getListAsync, createSystemAsycn } = systemSlice.actions

export const { selectStatus, selectError, selectCount, selectList } = systemSlice.selectors
