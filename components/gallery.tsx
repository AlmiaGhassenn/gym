'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

import { useI18n } from '@/components/i18n-provider';
import type { Messages } from '@/lib/i18n/dictionaries';
import { easeLuxury, fadeUpItem, fadeUpItemReduced, staggerContainer, viewportOnce } from '@/lib/motion';
import { houseImageMedia } from '@/lib/site-images';

type GalleryImageKey = keyof Messages['gallery']['images'];

export function Gallery() {
  const { messages, t } = useI18n();
  const reduce = useReducedMotion();
  const item = reduce ? fadeUpItemReduced : fadeUpItem;

  return (
    <section
      id="facilities"
      className="scroll-mt-24 border-y border-border/50 bg-gradient-to-b from-muted/25 via-background to-background py-20 dark:from-muted/10 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 md:mb-16 md:flex md:items-end md:justify-between md:gap-12"
        >
          <motion.div variants={item} className="max-w-xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {t('gallery.eyebrow')}
            </p>
            <h2 className="mb-5 font-serif text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('gallery.heading')}
            </h2>
            <p className="text-sm font-light leading-relaxed text-muted-foreground md:text-base">
              {t('gallery.body')}
            </p>
          </motion.div>
          <motion.p
            variants={item}
            className="mt-8 hidden max-w-xs border-l border-border/70 pl-6 text-xs font-light leading-relaxed text-muted-foreground md:mt-0 md:block"
          >
            {t('gallery.aside')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4 md:auto-rows-auto">
          {houseImageMedia.map((itemMedia, index) => {
            const key = String(itemMedia.id) as GalleryImageKey;
            const copy = messages.gallery.images[key];

            return (
              <motion.article
                key={itemMedia.id}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: easeLuxury }}
                viewport={viewportOnce}
                whileHover={reduce ? undefined : { y: -3, transition: { duration: 0.28, ease: easeLuxury } }}
                className={`group relative overflow-hidden border border-border/60 bg-card shadow-sm ${itemMedia.span}`}
              >
                <Image
                  src={itemMedia.src}
                  alt={copy.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100 dark:from-black/85 dark:via-black/40"
                  aria-hidden
                />
                <motion.div
                  className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 md:p-6"
                  initial={false}
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif text-lg font-light tracking-wide text-white md:text-xl">
                    {copy.title}
                  </h3>
                  <p className="max-w-md text-xs font-light leading-relaxed text-white/75 md:text-sm">
                    {copy.caption}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 border-t border-border/60 pt-8 text-xs font-light leading-relaxed text-muted-foreground md:hidden"
        >
          {t('gallery.aside')}
        </motion.p>
      </div>
    </section>
  );
}
