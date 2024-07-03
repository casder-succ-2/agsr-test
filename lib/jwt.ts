import { User } from '@prisma/client'
import { SignJWT, jwtVerify } from 'jose'

export const generateTokens = async (user: User) => {
	const asKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
	const rfKey = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

	const as = await new SignJWT({ id: user.id })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('5 seconds')
		.sign(asKey)

	const rf = await new SignJWT({ id: user.id })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1 day')
		.sign(rfKey)

	return { as, rf }
}

export async function verifyAccessToken(token: string): Promise<any> {
	const key = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

	const { payload } = await jwtVerify(token, key, {
		algorithms: ['HS256'],
	})

	return payload
}

export async function verifyRefreshToken(token: string): Promise<any> {
	const key = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

	const { payload } = await jwtVerify(token, key, {
		algorithms: ['HS256'],
	})

	return payload
}
