export function resolveMessage(messages: unknown, path: string): string {
  const parts = path.split('.').filter(Boolean)
  let cur: unknown = messages
  for (const p of parts) {
    if (cur === null || cur === undefined) return path
    if (typeof cur !== 'object') return path
    cur = (cur as Record<string, unknown>)[p]
  }
  return typeof cur === 'string' ? cur : path
}
