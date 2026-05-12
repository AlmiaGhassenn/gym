'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useI18n } from '@/components/i18n-provider'
import type { Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'en' || segments[0] === 'fr') {
    segments[0] = target
  } else {
    segments.unshift(target)
  }
  return '/' + segments.join('/')
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() || '/'
  const { locale, t } = useI18n()

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground',
        className,
      )}
      role="navigation"
      aria-label={t('language.label')}
    >
      <Link
        href={switchLocalePath(pathname, 'en')}
        className={cn('hover:text-foreground transition-colors', locale === 'en' && 'text-foreground')}
        hrefLang="en"
      >
        {t('language.en')}
      </Link>
      <span className="text-border" aria-hidden>
        |
      </span>
      <Link
        href={switchLocalePath(pathname, 'fr')}
        className={cn('hover:text-foreground transition-colors', locale === 'fr' && 'text-foreground')}
        hrefLang="fr"
      >
        {t('language.fr')}
      </Link>
    </div>
  )
}
