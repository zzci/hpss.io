'use client'

import React, { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { Dropdown, Button } from 'antd'
import { useParams } from 'next/navigation'
import { type Locale } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/routing'
import type { MenuProps } from 'antd'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  const handleLocaleChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: 'English',
      onClick: () => handleLocaleChange('en'),
    },
    {
      key: 'zh',
      label: '中文',
      onClick: () => handleLocaleChange('zh'),
    },
  ]

  return (
    <Dropdown menu={{ items }} disabled={isPending}>
      <Button type='text'>{locale === 'en' ? 'English' : '中文'}</Button>
    </Dropdown>
  )
}
