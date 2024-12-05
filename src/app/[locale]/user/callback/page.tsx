'use client'

import { useEffect } from 'react'

export default function MockSSOCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirectUri = params.get('redirect_uri')

    if (!redirectUri) {
      console.error('Missing redirect_uri')
      return
    }

    // 模拟 SSO 登录成功
    const mockToken = `mock_token_${Date.now()}`
    const finalRedirectUrl = `${redirectUri}?token=${mockToken}`
    window.location.href = finalRedirectUrl
  }, [])

  return null
}
