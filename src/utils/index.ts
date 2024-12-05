const isDev = process.env.NODE_ENV === 'development'

const getThemeBg = (theme = true) => {
  return theme
    ? {
        backgroundColor: 'rgba(73, 82, 123, 0.3)',
        color: 'rgba(255, 255, 255, 1)',
      }
    : {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: 'rgba(0, 0, 0, 1)',
      }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1] || null
  )
}

export function setToken(token: string): void {
  document.cookie = `token=${token}; path=/; max-age=86400`
}

export function removeToken(): void {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
}

export { getThemeBg, isDev }
