import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { defaultLocale, isLocale, locales, type Locale } from '@/lib/i18n/config'

function preferredLocale(request: NextRequest): Locale {
  const accept = request.headers.get('accept-language')?.toLowerCase() ?? ''
  if (accept.startsWith('fr') || accept.includes('fr-') || accept.includes('fr,')) {
    return 'fr'
  }
  return defaultLocale
}

function pathnameHasLocale(pathname: string): boolean {
  return locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathnameHasLocale(pathname)) {
    const url = request.nextUrl.clone()
    const target = preferredLocale(request)
    url.pathname = `/${target}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  const segment = pathname.split('/')[1]
  const locale: Locale = isLocale(segment) ? segment : defaultLocale

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
