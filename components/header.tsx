'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

import { useI18n } from '@/components/i18n-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import { easeLuxury } from '@/lib/motion';
import { ThemeToggle } from '@/components/theme-toggle';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div whileHover={reduce ? undefined : { y: -1 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className="group relative text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
        <span
          className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent/70 transition-[width] duration-300 ease-out group-hover:w-full"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

export function Header() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  return (
    <motion.header
      initial={{ opacity: 0, y: reduce ? 0 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeLuxury }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-md border-b border-border/60"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
        <motion.div whileHover={reduce ? undefined : { scale: 1.01 }} transition={{ duration: 0.2 }}>
          <Link href={href('/')} className="text-xl md:text-2xl font-serif font-light tracking-tight text-foreground">
            Elloumi<span className="text-accent">{t('header.brandAccent')}</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <NavLink href={href('/#facilities')}>{t('header.house')}</NavLink>
          <NavLink href={href('/#membership')}>{t('header.membership')}</NavLink>
          <NavLink href={href('/reservation')}>{t('header.reserve')}</NavLink>
          <NavLink href={href('/#contact')}>{t('header.contact')}</NavLink>
          <LanguageSwitcher />
          <motion.div whileHover={reduce ? undefined : { y: -1 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
            <Link
              href={href('/reservation')}
              className="px-5 py-2 bg-accent text-accent-foreground text-[11px] font-medium uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
            >
              {t('header.concierge')}
            </Link>
          </motion.div>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <motion.div whileTap={reduce ? undefined : { scale: 0.97 }}>
            <Link
              href={href('/reservation')}
              className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-accent-foreground bg-accent"
            >
              {t('header.reserve')}
            </Link>
          </motion.div>
          <button type="button" aria-label={t('header.menu')} className="p-2">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-foreground" />
              <div className="w-6 h-0.5 bg-foreground" />
              <div className="w-6 h-0.5 bg-foreground" />
            </div>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
