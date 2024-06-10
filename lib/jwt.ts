import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

type JWT_Payload = {
	id: string
	iat: number
	exp: number
}

export const generateToken = async (user: User) => {
	return await new SignJWT(user)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1 day')
		.sign(key)
}

export async function verifyToken(token: string): Promise<any> {
	const { payload } = await jwtVerify(token, key, {
		algorithms: ['HS256'],
	})

	return payload
}
