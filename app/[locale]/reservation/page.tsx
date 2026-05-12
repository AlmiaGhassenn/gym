import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ReservationForm } from '@/components/reservation-form'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const dict = await getDictionary(raw)

  return {
    title: dict.reservation.metaTitle,
    description: dict.reservation.metaDescription,
  }
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const dict = await getDictionary(raw)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 pb-24 pt-28 md:px-12 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {dict.reservation.eyebrow}
          </p>
          <h1 className="mb-4 font-serif text-3xl font-light tracking-tight text-foreground md:text-5xl">
            {dict.reservation.heading}
          </h1>
          <p className="mb-12 max-w-xl text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            {dict.reservation.body}
          </p>
          <ReservationForm />
          <p className="mt-10 text-sm font-light text-muted-foreground">
            <Link href={`/${raw}`} className="text-foreground underline-offset-4 hover:underline">
              {dict.reservation.back}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
