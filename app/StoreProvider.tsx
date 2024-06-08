'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'

import { makeStore, AppStore } from '@/lib/store'

interface Props {
	readonly children: ReactNode
}

export const StoreProvider = ({ children }: Props) => {
	const storeRef = useRef<AppStore | null>(null)

	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}

	useEffect(() => {
		if (storeRef.current != null) {
			const unsubscribe = setupListeners(storeRef.current.dispatch)
			return unsubscribe
		}
	}, [])

	return <Provider store={storeRef.current}>{children}</Provider>
}
