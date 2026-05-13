import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GymAiAssistant } from '@/components/gym-ai-assistant'
import { I18nProvider } from '@/components/i18n-provider'
import { isLocale, locales, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = await getDictionary(raw)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const messages = await getDictionary(raw)

  return (
    <I18nProvider locale={raw} messages={messages}>
      {children}
      <GymAiAssistant />
    </I18nProvider>
  )
}
