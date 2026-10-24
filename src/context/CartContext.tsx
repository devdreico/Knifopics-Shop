import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProduct } from '../data/catalog'
import type { Product } from '../data/types'

/** Línea resuelta contra el catálogo (lo que consumen las páginas). */
export type CartLine = {
  product: Product
  qty: number
}

/** Formato persistido en localStorage (v2): solo slug + qty. */
export type StoredLine = { slug: string; qty: number }

type StoredCart = { version: 2; lines: StoredLine[] }

type CartCtx = {
  lines: CartLine[]
  count: number
  total: number
  add: (product: Product, qty?: number) => void
  remove: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  clear: () => void
  bump: number
}

const CartContext = createContext<CartCtx | null>(null)

const STORAGE = 'knifopics-cart'
const MAX_QTY = 99

function clampQty(n: unknown): number {
  const q = typeof n === 'number' && Number.isFinite(n) ? Math.floor(n) : 1
  return Math.min(Math.max(q, 1), MAX_QTY)
}

/**
 * Parsea cualquier formato guardado (v2 `{version,lines}`, legado `[{product,qty}]`,
 * o basura) a líneas normalizadas. No valida contra catálogo.
 */
export function parseCart(raw: string | null): StoredLine[] {
  if (!raw) return []
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    const out: StoredLine[] = []
    for (const entry of data as unknown[]) {
      if (entry && typeof entry === 'object') {
        const e = entry as { slug?: unknown; qty?: unknown; product?: { slug?: unknown } }
        const slug =
          typeof e.slug === 'string'
            ? e.slug
            : typeof e.product?.slug === 'string'
              ? e.product.slug
              : null
        if (slug) out.push({ slug, qty: clampQty(e.qty) })
      }
    }
    return dedupe(out)
  } catch {
    return []
  }
}

export function serializeCart(lines: StoredLine[]): string {
  const cart: StoredCart = { version: 2, lines: lines.map((l) => ({ slug: l.slug, qty: l.qty })) }
  return JSON.stringify(cart)
}

function dedupe(lines: StoredLine[]): StoredLine[] {
  const map = new Map<string, number>()
  for (const l of lines) map.set(l.slug, (map.get(l.slug) ?? 0) + l.qty)
  return [...map.entries()].map(([slug, qty]) => ({ slug, qty: clampQty(qty) }))
}

function resolve(lines: StoredLine[]): CartLine[] {
  const out: CartLine[] = []
  for (const l of lines) {
    const product = getProduct(l.slug)
    if (product) out.push({ product, qty: l.qty })
  }
  return out
}

export function loadCart(): StoredLine[] {
  try {
    return parseCart(localStorage.getItem(STORAGE))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>(loadCart)
  const [bump, setBump] = useState(0)

  const lines = useMemo(() => resolve(stored), [stored])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, serializeCart(stored))
    } catch {
      /* storage lleno o bloqueado: el carrito sigue vivo en memoria */
    }
  }, [stored])

  const add = useCallback((product: Product, qty = 1) => {
    setStored((prev) => {
      const existing = prev.find((l) => l.slug === product.slug)
      if (existing) {
        return prev.map((l) =>
          l.slug === product.slug ? { ...l, qty: clampQty(l.qty + qty) } : l,
        )
      }
      return [...prev, { slug: product.slug, qty: clampQty(qty) }]
    })
    setBump((b) => b + 1)
  }, [])

  const remove = useCallback((slug: string) => {
    setStored((prev) => prev.filter((l) => l.slug !== slug))
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    setStored((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: clampQty(qty) } : l)),
    )
  }, [])

  const clear = useCallback(() => setStored([]), [])

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
    return { lines, count, total, add, remove, setQty, clear, bump }
  }, [lines, add, remove, setQty, clear, bump])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
