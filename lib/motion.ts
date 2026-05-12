import type { Transition, Variants } from 'framer-motion'

/** Editorial easing — calm in, no bounce */
export const easeLuxury: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const transitionSoft: Transition = {
  duration: 0.55,
  ease: easeLuxury,
}

export const viewportOnce = {
  once: true,
  margin: '-60px' as const,
  amount: 0.2 as const,
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeLuxury },
  },
}

export const fadeUpItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35 },
  },
}
