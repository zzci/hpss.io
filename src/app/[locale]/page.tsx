/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getToken, setToken } from '@/utils'
import { message } from 'antd'

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const error = params.get('error')

    if (error) {
      message.error(decodeURIComponent(error))
      router.replace(`/${locale}/user/login`)
      return
    }

    if (token) {
      setToken(token)
      message.success('登录成功')
      router.replace(`/${locale}/dashboard`)
      return
    }

    // 检查现有 token
    const existingToken = getToken()
    if (existingToken) {
      router.replace(`/${locale}/dashboard`)
    } else {
      router.replace(`/${locale}/user/login`)
    }
  }, [locale, router])

  return null
}
