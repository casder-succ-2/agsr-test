import { z } from 'zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { database } from '@/db'

import { verifyToken } from '@/lib/jwt'
import { compareTextWithHash, getHash } from '@/lib/security'

const updateSchema = z.object({
	email: z.string().min(1, 'Required'),
	phoneNumber: z.string().min(1, 'Required'),
})

export async function PUT(req: Request) {
	const cookieStore = cookies()
	const bearerToken = cookieStore.get('auth_token')

	const { email, phoneNumber } = await req.json()

	const validatedFields = updateSchema.safeParse({
		email,
		phoneNumber,
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
		const { id } = verifyToken(bearerToken?.value || '')
		const user = await database.user.update({
			where: { id },
			data: {
				email,
				phoneNumber,
			},
		})

		return NextResponse.json({ user })
	} catch (error) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
}
