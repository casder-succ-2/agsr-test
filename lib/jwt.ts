import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

const SECRET = 'secret'

type JWT_Payload = {
    id: string
    iat: number
    exp: number
}

export const generateToken = (user: User) => {
	return jwt.sign({ id: user.id }, SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string) => {
	return jwt.verify(token, SECRET) as JWT_Payload
}
