import type { Locale } from '@/lib/i18n/config'

import en from '@/messages/en.json'
import fr from '@/messages/fr.json'

const dictionaries = { en, fr } as const

export type Messages = typeof en

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]
}
