/** Cart items persisted in localStorage (v2): only product slug and quantity. */
export type StoredLine = { slug: string; qty: number }

type StoredCart = { version: 2; lines: StoredLine[] }

const MAX_QTY = 99

export function clampQty(n: unknown): number {
  const q = typeof n === 'number' && Number.isFinite(n) ? Math.floor(n) : 1
  return Math.min(Math.max(q, 1), MAX_QTY)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function dedupe(lines: StoredLine[]): StoredLine[] {
  const map = new Map<string, number>()
  for (const line of lines) map.set(line.slug, (map.get(line.slug) ?? 0) + line.qty)
  return [...map.entries()].map(([slug, qty]) => ({ slug, qty: clampQty(qty) }))
}

/**
 * Parse v2 `{version,lines}` and legacy `[{product,qty}]` cart formats.
 * Catalog validation is handled separately when resolving the cart.
 */
export function parseCart(raw: string | null): StoredLine[] {
  if (!raw) return []
  try {
    const data: unknown = JSON.parse(raw)
    const entries = Array.isArray(data)
      ? data
      : isRecord(data) && data.version === 2 && Array.isArray(data.lines)
        ? data.lines
        : []
    const lines: StoredLine[] = []
    for (const entry of entries) {
      if (!isRecord(entry)) continue
      const product = isRecord(entry.product) ? entry.product : null
      const slug =
        typeof entry.slug === 'string'
          ? entry.slug
          : typeof product?.slug === 'string'
            ? product.slug
            : null
      if (slug?.trim()) lines.push({ slug, qty: clampQty(entry.qty) })
    }
    return dedupe(lines)
  } catch {
    return []
  }
}

export function serializeCart(lines: StoredLine[]): string {
  const cart: StoredCart = { version: 2, lines: lines.map((line) => ({ ...line })) }
  return JSON.stringify(cart)
}
