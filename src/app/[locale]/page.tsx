import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 验证token的函数
async function validateToken(token: string) {
  try {
    // 这里添加你的token验证逻辑
    // 例如：调用验证API或解析JWT
    return true
  } catch (error) {
    return false
  }
}

export default async function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (token?.value && await validateToken(token.value)) {
    redirect('/dashboard')
  } else {
    redirect('/user/login')
  }

  return null
}
