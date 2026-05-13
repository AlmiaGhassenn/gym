'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

import { useI18n } from '@/components/i18n-provider';
import { easeLuxury, fadeUpItem, fadeUpItemReduced, staggerContainer, viewportOnce } from '@/lib/motion';

export function Membership() {
  const { messages, t, href } = useI18n();
  const plans = messages.membership.plans;
  const reduce = useReducedMotion();
  const item = reduce ? fadeUpItemReduced : fadeUpItem;

  return (
    <section id="membership" className="scroll-mt-24 py-20 md:py-32 px-6 md:px-12 bg-card border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <motion.p
            variants={item}
            className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            {t('membership.eyebrow')}
          </motion.p>
          <motion.h2 variants={item} className="text-3xl md:text-5xl font-serif font-light tracking-tight mb-5">
            {t('membership.heading')}
          </motion.h2>
          <motion.p
            variants={item}
            className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base font-light leading-relaxed"
          >
            {t('membership.body')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name + index}
              initial={{ opacity: 0, y: reduce ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: easeLuxury }}
              viewport={viewportOnce}
              whileHover={
                reduce
                  ? undefined
                  : plan.featured
                    ? { y: -5, transition: { duration: 0.3, ease: easeLuxury } }
                    : { y: -3, transition: { duration: 0.3, ease: easeLuxury } }
              }
              className={`relative p-8 border transition-shadow duration-300 ${
                plan.featured
                  ? 'border-accent/80 bg-background shadow-md ring-1 ring-accent/10'
                  : 'border-border/80 bg-background/80 hover:shadow-md'
              }`}
            >
              {plan.featured && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border border-accent/30 bg-card px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground"
                >
                  {t('membership.badgeFeatured')}
                </motion.div>
              )}

              <h3 className="text-xl font-serif font-light tracking-wide mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 font-light leading-relaxed">{plan.description}</p>

              <div className="mb-8 border-b border-border/60 pb-6">
                <span className="text-3xl md:text-4xl font-light tracking-tight">{plan.price}</span>
                {!plan.priceIsInquiry && (
                  <span className="text-muted-foreground text-sm font-light">{t('membership.perMonth')}</span>
                )}
              </div>

              <motion.div whileHover={reduce ? undefined : { scale: 1.01 }} whileTap={reduce ? undefined : { scale: 0.99 }}>
                <Link
                  href={href('/reservation')}
                  className={`mb-8 flex w-full justify-center py-3 text-center text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                    plan.featured
                      ? 'bg-accent text-accent-foreground hover:opacity-90'
                      : 'border border-foreground/15 text-foreground hover:border-foreground/30'
                  }`}
                >
                  {plan.priceIsInquiry ? t('membership.ctaInquire') : t('membership.ctaConsult')}
                </Link>
              </motion.div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: reduce ? 0 : -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.35, delay: 0.04 * i, ease: easeLuxury }}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      initial={false}
                      whileInView={{ scale: [0.85, 1], opacity: [0.6, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.05 * i }}
                    >
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    </motion.span>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
