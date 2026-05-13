'use client'

import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Sparkles, XIcon } from 'lucide-react'

import { useI18n } from '@/components/i18n-provider'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { easeLuxury } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Line = { id: string; role: 'user' | 'assistant'; content: string }

function id() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function renderWithBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={j} className="font-semibold text-accent">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={j}>{part}</span>
  })
}

export function GymAiAssistant() {
  const { messages, t } = useI18n()
  const items = messages.assistant.items
  const reduce = useReducedMotion()
  const [open, setOpen] = React.useState(false)
  const [lines, setLines] = React.useState<Line[]>([])
  const [used, setUsed] = React.useState<Set<number>>(() => new Set())
  const [replying, setReplying] = React.useState(false)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const replyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    if (!open) return
    setUsed(new Set())
    setLines([{ id: id(), role: 'assistant', content: t('assistant.opening') }])
    setReplying(false)
    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current)
      replyTimerRef.current = null
    }
  }, [open, t])

  React.useEffect(() => {
    if (open) return
    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current)
      replyTimerRef.current = null
    }
  }, [open])

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }, [lines, replying, open, reduce])

  const pickTopic = React.useCallback(
    (index: number) => {
      if (used.has(index) || replying) return
      const row = items[index]
      if (!row) return

      setReplying(true)
      setUsed((prev) => new Set(prev).add(index))
      setLines((prev) => [...prev, { id: id(), role: 'user', content: row.q }])

      const delay = reduce ? 0 : 420
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current)
      replyTimerRef.current = setTimeout(() => {
        replyTimerRef.current = null
        setLines((prev) => [...prev, { id: id(), role: 'assistant', content: row.a }])
        setReplying(false)
      }, delay)
    },
    [items, used, replying, reduce],
  )

  const remaining = items.length - used.size

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <motion.button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t('assistant.triggerLabel')}
        onClick={() => setOpen((o) => !o)}
          initial={reduce ? false : { scale: 0.92, opacity: 0 }}
          animate={
            reduce
              ? undefined
              : {
                  scale: open ? 0.94 : 1,
                  opacity: 1,
                }
          }
          transition={{ duration: 0.45, ease: easeLuxury }}
          whileHover={reduce || open ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          className={cn(
            'fixed bottom-5 right-5 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl sm:bottom-8 sm:right-8',
            open ? 'z-[210]' : 'z-40',
            'border-2 border-accent/80 bg-zinc-950 text-amber-100 shadow-[0_0_0_1px_rgba(250,250,249,0.06),0_22px_50px_-12px_rgba(0,0,0,0.65),0_0_80px_-20px_theme(colors.accent/0.45)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
        >
          <Sparkles
            className="size-7 drop-shadow-[0_0_12px_rgba(250,204,21,0.35)]"
            strokeWidth={1.25}
            aria-hidden
          />
        </motion.button>

      <DialogContent
        showCloseButton={false}
        className={cn(
          /* Anchor to the same corner as the FAB — pops open from above the button */
          'fixed top-auto left-auto z-[200] translate-x-0 translate-y-0',
          'bottom-[calc(1.25rem+4.25rem+0.75rem)] right-5 sm:bottom-[calc(2rem+4.25rem+0.75rem)] sm:right-8',
          'flex h-[min(72dvh,560px)] w-[min(calc(100vw-2.5rem),400px)] max-w-none flex-col gap-0 overflow-hidden',
          'rounded-2xl rounded-br-xl border-accent/35 bg-zinc-950 p-0 text-zinc-100',
          'shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_40px_-8px_rgba(0,0,0,0.55),0_28px_90px_-24px_rgba(0,0,0,0.65)]',
          'duration-300 ease-out',
          reduce
            ? 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
            : 'origin-bottom-right data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-[90px]" />
          <div className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(39,39,42,0.5)_0%,rgba(9,9,11,1)_38%)]" />
        </div>

        <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/15 text-accent">
              <Sparkles className="size-4" strokeWidth={1.5} aria-hidden />
            </span>
            <div className="min-w-0">
              <DialogTitle className="truncate font-serif text-base font-light tracking-tight text-white">
                {t('assistant.chatTitle')}
              </DialogTitle>
              <DialogDescription className="sr-only">{t('assistant.subtitle')}</DialogDescription>
              <p className="truncate text-[10px] uppercase tracking-[0.28em] text-zinc-500">{t('assistant.eyebrow')}</p>
            </div>
          </div>
          <DialogClose
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-white/20 hover:bg-white/5 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={t('assistant.close')}
          >
            <XIcon className="size-4" />
          </DialogClose>
        </div>

        <ScrollArea className="relative min-h-0 flex-1 basis-0">
          <div className="space-y-3 px-4 py-4">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28, ease: easeLuxury }}
                  className={cn('flex w-full', line.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm',
                      line.role === 'user'
                        ? 'rounded-br-md border border-accent/25 bg-accent/15 text-zinc-100'
                        : 'rounded-bl-md border border-white/10 bg-zinc-900/80 text-zinc-300',
                    )}
                  >
                    <p>{renderWithBold(line.content)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {replying ? (
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md border border-white/10 bg-zinc-900/60 px-3.5 py-2.5">
                  <span className="flex gap-1">
                    <span className="inline-block size-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.2s]" />
                    <span className="inline-block size-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.1s]" />
                    <span className="inline-block size-1.5 animate-bounce rounded-full bg-zinc-500" />
                  </span>
                </div>
              </motion.div>
            ) : null}

            <div ref={bottomRef} className="h-px w-full shrink-0" aria-hidden />
          </div>
        </ScrollArea>

        <div className="relative border-t border-white/10 bg-zinc-950/90 px-4 py-3 backdrop-blur-sm">
          {remaining > 0 ? (
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{t('assistant.pickOne')}</p>
          ) : (
            <p className="mb-2 text-center text-[12px] leading-snug text-zinc-400">{renderWithBold(t('assistant.allAnswered'))}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {items.map((row, i) => {
              const done = used.has(i)
              return (
                <button
                  key={i}
                  type="button"
                  disabled={done || replying}
                  onClick={() => pickTopic(i)}
                  className={cn(
                    'max-w-full rounded-full border px-3 py-1.5 text-left text-[11px] font-medium leading-snug transition',
                    done
                      ? 'cursor-default border-transparent bg-white/[0.04] text-zinc-600 line-through decoration-zinc-600'
                      : 'border-accent/35 bg-accent/10 text-zinc-100 hover:border-accent/60 hover:bg-accent/20 disabled:opacity-50',
                  )}
                >
                  <span className="text-accent/90">{i + 1}.</span> {row.q}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-center text-[9px] uppercase tracking-[0.2em] text-zinc-600">{t('assistant.footer')}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
