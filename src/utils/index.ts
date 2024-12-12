export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1] || null
  );
}

export function setToken(token: string): void {
  document.cookie = `token=${token}; path=/; max-age=86400`;
}

export function removeToken(): void {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
