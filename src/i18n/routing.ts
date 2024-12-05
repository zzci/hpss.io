import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  // output: 'export' is not set as-needed
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/user': '/user',
    '/dashboard': '/dashboard',
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)
