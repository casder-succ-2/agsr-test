import { z } from 'zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { database } from '@/db'

import { generateToken, verifyToken } from '@/lib/jwt'
import { compareTextWithHash } from '@/lib/security'

const loginSchema = z.object({
	email: z.string().email().min(1, 'Required'),
	password: z.string().min(1, 'Please enter password'),
})

const updateSchema = z.object({
	lastName: z.string().min(1, 'Required'),
	middleName: z.string().min(1, 'Required'),
	firstName: z.string().min(1, 'Required'),
	identificationNumber: z.string().min(1, 'Required'),
	userName: z.string().min(1, 'Required'),
})

export async function GET(req: Request) {
	const cookieStore = cookies()
	const bearerToken = cookieStore.get('auth_token')

	try {
		const { id } = verifyToken(bearerToken?.value || '')
		const user = await database.user.findFirst({ where: { id } })

		return NextResponse.json({ user })
	} catch (error) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
}

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
			{ status: 401 },
		)
	}

	const accessToken = generateToken(user)
	cookies().set('auth_token', accessToken)

	return NextResponse.json({ user })
}

export async function PUT(req: Request) {
	const cookieStore = cookies()
	const bearerToken = cookieStore.get('auth_token')

	const { lastName, middleName, firstName, identificationNumber, userName } =
		await req.json()

	const validatedFields = updateSchema.safeParse({
		lastName,
		middleName,
		firstName,
		identificationNumber,
		userName,
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

		const updatedUser = await database.user.update({
			where: { id },
			data: {
				lastName,
				middleName,
				firstName,
				identificationNumber,
				userName,
			},
		})
		return NextResponse.json({ user: updatedUser })
	} catch (error) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
}
