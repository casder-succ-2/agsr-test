import { z } from 'zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { database } from '@/db'
import { generateTokens } from '@/lib/jwt'
import { compareTextWithHash } from '@/lib/security'

const loginSchema = z.object({
	email: z.string().email().min(1, 'Required'),
	password: z.string().min(1, 'Please enter password'),
})

export async function POST(req: Request) {
	const { email, password } = await req.json()

	const validatedFields = loginSchema.safeParse({
		email,
		password,
	})

	if (!validatedFields.success) {
		return NextResponse.json(
			{
				...validatedFields.error.flatten().fieldErrors,
			},
			{ status: 400 },
		)
	}

	const user = await database.user.findFirst({ where: { email } })

	if (!user) {
		return NextResponse.json(
			{ message: 'The email or password you have entered is invalid' },
			{ status: 401 },
		)
	}

	const isPasswordMatch = await compareTextWithHash(password, user.password)

	if (!isPasswordMatch) {
		return NextResponse.json(
			{ message: 'The email or password you have entered is invalid' },
			{ status: 400 },
		)
	}

	const { as, rf } = await generateTokens(user)

	cookies().set('auth_token', as, { path: '/' })
	cookies().set('refresh_token', rf, { path: '/', httpOnly: true })

	await database.user.update({
		where: {
			id: user.id,
		},
		data: {
			refreshToken: rf,
		},
	})

	return NextResponse.json({ user })
}
