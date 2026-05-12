'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Dumbbell, Users, Zap, Heart } from 'lucide-react';

import { useI18n } from '@/components/i18n-provider';
import { easeLuxury, fadeUpItem, fadeUpItemReduced, staggerContainer, viewportOnce } from '@/lib/motion';

const icons = [Dumbbell, Users, Zap, Heart] as const;

export function Features() {
  const { messages, t } = useI18n();
  const items = messages.features.items;
  const reduce = useReducedMotion();
  const item = reduce ? fadeUpItemReduced : fadeUpItem;

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-card border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            variants={item}
            className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            {t('features.eyebrow')}
          </motion.p>
          <motion.h2
            variants={item}
            className="text-3xl md:text-5xl font-serif font-light tracking-tight mb-6"
          >
            {t('features.heading')}
          </motion.h2>
          <motion.div variants={item} className="mx-auto w-10 pt-1">
            <motion.div
              className="h-px w-full bg-accent/50"
              initial={{ scaleX: reduce ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: easeLuxury, delay: 0.15 }}
              style={{ transformOrigin: '50% 50%' }}
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {items.map((feature, index) => {
            const Icon = icons[index] ?? Dumbbell;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: easeLuxury }}
                viewport={viewportOnce}
                whileHover={reduce ? undefined : { y: -4 }}
                className="text-center md:text-left"
              >
                <motion.div
                  className="inline-flex border border-border/80 bg-background/50 p-4 mb-5"
                  whileHover={reduce ? undefined : { borderColor: 'hsl(var(--accent) / 0.35)' }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    whileHover={reduce ? undefined : { rotate: [0, -4, 4, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon className="h-7 w-7 text-accent" strokeWidth={1.25} />
                  </motion.div>
                </motion.div>
                <h3 className="text-lg font-medium tracking-tight mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
