'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

import { useI18n } from '@/components/i18n-provider';
import { easeLuxury, viewportOnce } from '@/lib/motion';

export function Footer() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  const col = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.08, ease: easeLuxury },
    }),
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div custom={0} variants={col} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h3 className="text-xl font-serif font-light tracking-tight mb-4">
              Elloumi<span className="text-accent">{t('header.brandAccent')}</span>
            </h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </motion.div>

          <motion.div custom={1} variants={col} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h4 className="font-medium mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={href('/#facilities')} className="hover:text-foreground transition-colors">
                  {t('header.house')}
                </Link>
              </li>
              <li>
                <Link href={href('/#membership')} className="hover:text-foreground transition-colors">
                  {t('header.membership')}
                </Link>
              </li>
              <li>
                <Link href={href('/reservation')} className="hover:text-foreground transition-colors">
                  {t('header.reserve')}
                </Link>
              </li>
              <li>
                <Link href={href('/#contact')} className="hover:text-foreground transition-colors">
                  {t('header.contact')}
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div custom={2} variants={col} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h4 className="font-medium mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t('footer.careers')}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div custom={3} variants={col} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h4 className="font-medium mb-4">{t('footer.follow')}</h4>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
                whileHover={reduce ? undefined : { y: -2, scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
                whileHover={reduce ? undefined : { y: -2, scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-accent transition-colors"
                whileHover={reduce ? undefined : { y: -2, scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground"
        >
          <p>
            &copy; {new Date().getFullYear()} {t('footer.copyrightBrand')}. {t('footer.rights')}
          </p>
          <p className="font-light">{t('footer.finePrint')}</p>
        </motion.div>
      </div>
    </footer>
  );
}
