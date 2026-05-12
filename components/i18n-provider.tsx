'use client'

import * as React from 'react'

import type { Locale } from '@/lib/i18n/config'
import type { Messages } from '@/lib/i18n/dictionaries'
import { resolveMessage } from '@/lib/i18n/resolve-message'

export type I18nContextValue = {
  locale: Locale
  messages: Messages
  t: (path: string) => string
  href: (path: string) => string
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

function buildHref(locale: Locale, path: string): string {
  const trimmed = path.startsWith('/') ? path : `/${path}`
  const parts = trimmed.split('#')
  const pathnameOnly = parts[0] || '/'
  const hash = parts.length > 1 ? `#${parts.slice(1).join('#')}` : ''
  const isRoot = pathnameOnly === '/' || pathnameOnly === ''
  const localized = isRoot ? `/${locale}` : `/${locale}${pathnameOnly}`
  return `${localized}${hash}`
}

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale
  messages: Messages
  children: React.ReactNode
}) {
  const value = React.useMemo<I18nContextValue>(() => {
    const t = (path: string) => resolveMessage(messages, path)
    const href = (path: string) => buildHref(locale, path)
    return { locale, messages, t, href }
  }, [locale, messages])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}
