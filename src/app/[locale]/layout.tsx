import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'index' })

  return {
    // metadataBase: new URL('http://localhost:3000'),
    title: t('title'),
    description: t('desc'),
  }
}

export default function LocaleLayout({ children, params: { locale } }: Readonly<Props>) {
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Receive messages provided in `i18n.ts`
  const messages = useMessages()

  return (
    <html lang={locale}>
      <head></head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntdRegistry>{children}</AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
