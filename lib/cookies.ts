import { setCookie, getCookie } from 'cookies-next'

export const setAuthCookie = (token: string, name: string) => {
	const toBase64 = Buffer.from(token).toString('base64')

	setCookie(name, toBase64, { path: '/', sameSite: 'strict', httpOnly: true })
}

export const getAuthCookie = (name: string) => {
	const cookie = getCookie(name)

	if (!cookie) return null

	return Buffer.from(cookie, 'base64').toString('ascii')
}
