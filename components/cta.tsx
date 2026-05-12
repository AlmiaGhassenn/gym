'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

import { useI18n } from '@/components/i18n-provider';
import { fadeUpItem, fadeUpItemReduced, staggerContainer, viewportOnce } from '@/lib/motion';

export function CTA() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();
  const item = reduce ? fadeUpItemReduced : fadeUpItem;

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-24 md:py-36 px-6 md:px-12 bg-foreground text-background"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={item}
            className="text-[11px] uppercase tracking-[0.35em] text-background/55 mb-6"
          >
            {t('cta.eyebrow')}
          </motion.p>
          <motion.h2
            variants={item}
            className="text-3xl md:text-5xl font-serif font-light tracking-tight mb-8 leading-tight"
          >
            {t('cta.heading')}
          </motion.h2>

          <motion.p
            variants={item}
            className="text-base md:text-lg text-background/70 mb-12 leading-relaxed max-w-xl mx-auto font-light"
          >
            {t('cta.body')}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
              <Link
                href={href('/reservation')}
                className="inline-flex min-w-[220px] justify-center px-8 py-3 bg-background text-foreground text-xs font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
              >
                {t('cta.primary')}
              </Link>
            </motion.div>
            <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
              <Link
                href={href('/reservation')}
                className="inline-flex min-w-[220px] justify-center px-8 py-3 border border-background/35 text-background text-xs font-medium uppercase tracking-[0.2em] hover:border-background/60 transition-colors"
              >
                {t('cta.secondary')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
