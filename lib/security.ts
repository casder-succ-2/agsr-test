import * as bcrypt from 'bcrypt'

export function getHash(text: string) {
  return bcrypt.hash(text, 10)
}

export function compareTextWithHash(text: string, hash: string) {
  return bcrypt.compare(text, hash)
}
