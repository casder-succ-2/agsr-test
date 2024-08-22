import { Buffer } from 'node:buffer'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export function setAuthCookie(token: string, name: string) {
  const toBase64 = Buffer.from(token).toString('base64')

  setCookie(name, toBase64, { path: '/', sameSite: 'strict', httpOnly: true })
}

export function getAuthCookie(name: string) {
  const cookie = getCookie(name)

  if (!cookie)
    return null

  return Buffer.from(cookie, 'base64').toString('ascii')
}

export function removeAuthCookie(name: string) {
  deleteCookie(name, { path: '/' })
}
