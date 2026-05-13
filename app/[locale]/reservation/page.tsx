import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarClock, ShieldCheck, Sparkles } from 'lucide-react'

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
      <main className="relative flex-1 overflow-hidden px-6 pb-24 pt-28 md:px-12 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,theme(colors.accent/12),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {dict.reservation.eyebrow}
            </p>
            <h1 className="mb-5 font-serif text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {dict.reservation.heading}
            </h1>
            <p className="text-sm font-light leading-relaxed text-muted-foreground md:text-base">
              {dict.reservation.body}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="rounded-sm border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
              <ReservationForm />
            </div>

            <aside className="space-y-4">
              <div className="rounded-sm border border-border/70 bg-card/50 p-6">
                <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Concierge notes</p>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CalendarClock className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>Visits are scheduled in calm windows to keep the floor quiet.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>Your details stay private and are used only to confirm your booking.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>Expect a personal walkthrough based on your training goals.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-sm border border-border/70 bg-background p-6">
                <p className="text-sm font-light text-muted-foreground">
                  <Link href={`/${raw}`} className="text-foreground underline-offset-4 hover:underline">
                    {dict.reservation.back}
                  </Link>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
