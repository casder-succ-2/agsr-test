import { User } from '@prisma/client'
import { apiService } from '@/services'

export interface PersonalInfo {
	firstName: string
	lastName: string
	middleName: string
	identificationNumber: string
	userName: string
}

export interface ChangePassword {
	newPassword: string
	password: string
}

export interface ContactInfo {
	email: string
	phoneNumber: string
}

export const fetchAccount = async () => {
	try {
		const response = await apiService.get('/api/account')

		return response as { user: Partial<User> }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}

export const login = async ({
	email,
	password,
}: {
	email: string
	password: string
}) => {
	try {
		const response = await apiService.post('/api/account/login', {
			email,
			password,
		})
		return response as { user: Partial<User> }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}

export const logout = async () => {
	try {
		const response = await apiService.put('/api/account/logout')
		return response as { user: Partial<User> }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}

export const updatePersonalInfo = async (data: PersonalInfo) => {
	try {
		const response = await apiService.put('/api/account/update', data)
		return response as { user: Partial<User> }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}

export const changePassword = async (data: ChangePassword) => {
	try {
		const response = await apiService.put('/api/account/change-password', data)
		return response as { user: Partial<User> }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}

export const updateContactInfo = async (data: ContactInfo) => {
	try {
		const response = await apiService.put(
			'/api/account/change-contact-info',
			data,
		)
		return response as { user: Partial<User> }
	} catch (error) {
		const e = error as { data: { message: string } }
		throw e.data.message
	}
}
