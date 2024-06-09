import { AutomatedInformationSystem } from '@prisma/client'

import { apiService } from '@/services'

export const fetchSystemList = async (params: {
	page: number
	perPage: number
	searchValue: string
}) => {
	try {
		const response = await apiService.get('/api/system', params)

		return response as { list: AutomatedInformationSystem[]; count: number }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}

export const createSystem = async () => {
	try {
		const response = await apiService.post('/api/system')

		return response as { system: AutomatedInformationSystem }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}
