import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'

export type CartLine = {
  product: Product
  qty: number
}

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

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load)
  const [bump, setBump] = useState(0)

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(lines))
  }, [lines])

  const add = useCallback((product: Product, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.product.slug === product.slug)
      if (found) {
        return prev.map((l) =>
          l.product.slug === product.slug ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
        )
      }
      return [...prev, { product, qty }]
    })
    setBump((b) => b + 1)
  }, [])

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.product.slug !== slug))
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.product.slug !== slug)
        : prev.map((l) => (l.product.slug === slug ? { ...l, qty: Math.min(qty, 99) } : l)),
    )
  }, [])

  const clear = useCallback(() => setLines([]), [])

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
