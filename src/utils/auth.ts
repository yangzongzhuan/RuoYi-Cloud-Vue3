import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const ExpiresInKey = 'Admin-Expires-In'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token)
}

export function removeToken(): void {
  Cookies.remove(TokenKey)
}

export function getExpiresIn(): string | number {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time: string | number): string | undefined {
  return Cookies.set(ExpiresInKey, time.toString())
}

export function removeExpiresIn(): void {
  Cookies.remove(ExpiresInKey)
}
