import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Providers } from '@/app/providers'
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config'

import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = await headers()
  const fromHeader = h.get('x-locale')
  const lang: Locale = fromHeader && isLocale(fromHeader) ? fromHeader : defaultLocale

  return (
    <html
      lang={lang}
      className="bg-background scroll-smooth"
      style={{
        '--font-serif': playfair.style.fontFamily,
        '--font-sans': inter.style.fontFamily,
      } as React.CSSProperties}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Providers>
      </body>
    </html>
  )
}
