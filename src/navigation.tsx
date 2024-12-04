import type { Pathnames } from 'next-intl/navigation'
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'

export const defaultLocale = 'en'

export const locales = ['en', 'zh'] as const

export const localePrefix =
  process.env.NEXT_PUBLIC_LOCALE_PREFIX === 'never' ? 'never' : 'as-needed'

export const pathnames = {
  '/': '/',
  '/user': '/user',
  '/dashboard': '/dashboard',
} satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames,
  })
