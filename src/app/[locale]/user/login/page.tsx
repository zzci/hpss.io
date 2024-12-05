/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */

'use client'

import { useLocale } from 'next-intl'
import { Button, message } from 'antd'
import styles from './index.module.less'

export default function Login() {
  const locale = useLocale()
  // const handleSSOLogin = () => {
  //   const ssoUrl = process.env.NEXT_PUBLIC_SSO_URL
  //   if (!ssoUrl) {
  //     message.error('SSO misconfiguration')
  //     return
  //   }

  //   // 构造回调 URL 到根路径
  //   const redirectUri = encodeURIComponent(`${window.location.origin}/${locale}`)

  //   // 跳转到 SSO 登录页
  //   window.location.href = `${ssoUrl}?redirect_uri=${redirectUri}`
  // }

  const handleSSOLogin = () => {
    const ssoUrl = process.env.NEXT_PUBLIC_SSO_URL
    if (!ssoUrl) {
      message.error('SSO misconfiguration')
      return
    }
    // 构造模拟 SSO 地址
    const mockSSOUrl = `/${locale}/user/callback`

    // 构造应用回调地址
    const redirectUri = encodeURIComponent(`${window.location.origin}/${locale}`)

    // 跳转到模拟的 SSO 页面
    window.location.href = `${mockSSOUrl}?redirect_uri=${redirectUri}`
  }

  return (
    <main className={styles.loginWrap}>
      <div className={styles.leftBanner}>
        <h2 style={{ color: '#fff' }}>HPS 运营后台</h2>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          专业 • 高效 • 安全 • 便捷
        </div>

        <div className={styles.banner}>
          <img src='/logo_bg.svg' alt='HPS Logo' />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <h1>欢迎登录 HPS 运营后台管理系统</h1>

          <div className={styles.loginButtons} style={{ maxWidth: 420, width: '100%' }}>
            <Button type='primary' block size='large' onClick={handleSSOLogin}>
              HPS SSO Login
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
