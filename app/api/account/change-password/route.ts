import { z } from 'zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { database } from '@/db'

import { verifyToken } from '@/lib/jwt'
import { compareTextWithHash, getHash } from '@/lib/security'

const updateSchema = z.object({
	password: z.string().min(1, 'Required'),
	newPassword: z.string().min(1, 'Required'),
})

export async function PUT(req: Request) {
	const headers = req.headers
	const userId = headers.get('userId') || ''

	const { password, newPassword } = await req.json()

	const validatedFields = updateSchema.safeParse({
		password,
		newPassword,
	})

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				...validatedFields.error.flatten().fieldErrors,
			},
			{ status: 400 },
		)
	}

	try {
		const user = await database.user.findUnique({
			where: { id: userId },
		})

		const isPasswordMatch = await compareTextWithHash(
			password,
			user?.password || '',
		)

		if (!isPasswordMatch) {
			return NextResponse.json(
				{ message: 'The password you have entered is invalid' },
				{ status: 401 },
			)
		}

		const newPasswordHash = await getHash(newPassword)
		const updatedUser = await database.user.update({
			where: { id: userId },
			data: {
				password: newPasswordHash,
			},
		})

		return NextResponse.json({ user: updatedUser })
	} catch (error) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
}
