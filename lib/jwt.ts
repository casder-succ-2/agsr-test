import process from 'node:process'
import { SignJWT, jwtVerify } from 'jose'
import type { User } from '@prisma/client'

export async function generateTokens(user: User) {
  const asKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
  const rfKey = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

  const as = await new SignJWT({ sub: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5 minutes')
    .sign(asKey)

  const rf = await new SignJWT({ sub: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day')
    .sign(rfKey)

  return { as, rf }
}

export async function verifyAccessToken(token: string) {
  const key = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

  const { payload } = await jwtVerify(token, key, {
    algorithms: ['HS256'],
  })

  return payload
}

export async function verifyRefreshToken(token: string) {
  const key = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

  const { payload } = await jwtVerify(token, key, {
    algorithms: ['HS256'],
  })

  return payload
}
