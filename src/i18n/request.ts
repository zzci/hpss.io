/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  // Import messages for the current locale
  const messages = (await import(`../../messages/${locale}.json`)).default

  return {
    locale,
    messages,
    // defaultTranslationValues: {
    //   globalString: 'Global string',
    //   highlight: (chunks) => <strong>{chunks}</strong>,
    // },
    formats: {
      dateTime: {
        medium: {
          dateStyle: 'medium',
          timeStyle: 'short',
          hour12: false,
        },
      },
    },
    onError(error) {
      if (
        error.message ===
        (process.env.NODE_ENV === 'production'
          ? 'MISSING_MESSAGE'
          : 'MISSING_MESSAGE: Could not resolve `missing` in `Index`.')
      ) {
        // Do nothing, this error is triggered on purpose
      } else {
        console.error(JSON.stringify(error.message))
      }
    },
    getMessageFallback({ key, namespace }) {
      return (
        '`getMessageFallback` called for ' +
        [namespace, key].filter((part) => part != null).join('.')
      )
    },
  }
})
