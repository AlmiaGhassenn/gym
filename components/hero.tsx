'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useI18n } from '@/components/i18n-provider';
import { easeLuxury, fadeUpItem, fadeUpItemReduced, staggerContainer } from '@/lib/motion';
import { heroImageSrc } from '@/lib/site-images';

export function Hero() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  const item = reduce ? fadeUpItemReduced : fadeUpItem;

  return (
    <section className="relative min-h-screen w-full bg-background overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.04 }}
        animate={reduce ? undefined : { scale: [1.04, 1.07, 1.04] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src={heroImageSrc}
          alt={t('hero.imageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/88 via-background/78 to-background dark:from-background/92 dark:via-background/85 dark:to-background"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--accent)/0.14),transparent)] dark:opacity-90"
          aria-hidden
        />
      </motion.div>
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]" aria-hidden>
        <div className="absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] h-[32rem] w-[32rem] rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.p
            variants={item}
            className="text-[11px] md:text-xs text-muted-foreground tracking-[0.35em] uppercase mb-8"
          >
            {t('hero.eyebrow')}
          </motion.p>

          <motion.div variants={item} className="mx-auto mb-10 w-12">
            <motion.div
              className="h-px w-full origin-center bg-accent/40"
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.75, delay: 0.45, ease: easeLuxury }}
              style={{ transformOrigin: '50% 50%' }}
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.05] tracking-tight text-balance mb-8"
          >
            {t('hero.titleLine1')}
            <br />
            <span className="font-normal italic text-foreground/90">{t('hero.titleLine2')}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-light"
          >
            {t('hero.body')}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
              <Link
                href={href('/reservation')}
                className="inline-flex min-w-[200px] justify-center px-8 py-3 bg-accent text-accent-foreground text-sm font-medium tracking-wide uppercase hover:opacity-90 transition-opacity"
              >
                {t('hero.ctaPrimary')}
              </Link>
            </motion.div>
            <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
              <a
                href={href('/#facilities')}
                className="inline-flex min-w-[200px] justify-center px-8 py-3 border border-foreground/20 text-foreground text-sm font-medium tracking-wide uppercase bg-background/40 backdrop-blur-sm hover:border-foreground/40 transition-colors dark:bg-background/20"
              >
                {t('hero.ctaSecondary')}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" aria-hidden />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
