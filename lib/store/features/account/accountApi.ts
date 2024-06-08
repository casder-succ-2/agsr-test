import { User } from '@prisma/client'
import { apiService } from '@/services'

export const fetchAccount = async () => {
	try {
		const response = await apiService.get('/api/account')
		return response as Partial<User>
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}

export const login = async ({
	email,
	password
}: {
	email: string
	password: string
}) => {
	try {
		const response = await apiService.post('/api/account', { email, password })
		return response as Partial<User>
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}
