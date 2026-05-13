'use client'

import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { useI18n } from '@/components/i18n-provider'
import { easeLuxury } from '@/lib/motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ReservationForm() {
  const { messages } = useI18n()
  const form = messages.reservation.form
  const [submitted, setSubmitted] = React.useState(false)
  const reduce = useReducedMotion()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: easeLuxury }}
          className="rounded-sm border border-border/80 bg-card p-8 md:p-10 text-center"
        >
          <p className="font-serif text-2xl font-light tracking-tight text-foreground mb-3">
            {form.successTitle}
          </p>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
            {form.successBody}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-7"
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -6 }}
          transition={{ duration: 0.45, ease: easeLuxury }}
        >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {form.name}
          </Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder={form.placeholders.name}
            className="h-11 border-border/70 bg-background/60"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {form.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={form.placeholders.email}
            className="h-11 border-border/70 bg-background/60"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {form.phone}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={form.placeholders.phone}
            className="h-11 border-border/70 bg-background/60"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {form.date}
          </Label>
          <Input id="date" name="date" type="date" required className="h-11 border-border/70 bg-background/60" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {form.time}
          </Label>
          <Input id="time" name="time" type="time" className="h-11 border-border/70 bg-background/60" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="focus" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {form.focus}
          </Label>
          <select
            id="focus"
            name="focus"
            required
            className="h-11 w-full rounded-md border border-border/70 bg-background/60 px-3 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
            defaultValue=""
          >
            <option value="" disabled>
              {form.focusPlaceholder}
            </option>
            {form.focusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {form.notes}
          </Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder={form.notesPlaceholder}
            className="min-h-[120px] resize-y border-border/70 bg-background/60"
          />
        </div>
      </div>
          <motion.div whileHover={reduce ? undefined : { scale: 1.01 }} whileTap={reduce ? undefined : { scale: 0.99 }}>
            <button
              type="submit"
              className="w-full rounded-sm bg-accent px-6 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-accent-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              {form.submit}
            </button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
