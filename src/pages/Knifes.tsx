import { useMemo, useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import { knifes, type Product } from '../data/products'

type Sort = 'featured' | 'asc' | 'desc'

export default function Knifes() {
  const [steel, setSteel] = useState('all')
  const [sort, setSort] = useState<Sort>('featured')
  const [q, setQ] = useState('')

  const steelOptions = useMemo(() => {
    const set = new Set<string>()
    knifes.forEach((p) => {
      const first = (p.steel ?? '').split('/')[0].trim()
      if (first) set.add(first)
    })
    return ['all', ...Array.from(set)]
  }, [])

  const list = useMemo(() => {
    let out = [...knifes]
    if (steel !== 'all') {
      out = out.filter((p) => (p.steel ?? '').includes(steel))
    }
    if (q.trim()) {
      const needle = q.toLowerCase()
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.short.toLowerCase().includes(needle) ||
          (p.steel ?? '').toLowerCase().includes(needle),
      )
    }
    if (sort === 'asc') out.sort((a, b) => a.price - b.price)
    if (sort === 'desc') out.sort((a, b) => b.price - a.price)
    return out
  }, [steel, sort, q])

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Sección principal"
        title="KNIFES"
        subtitle="Cuchillos premium de todos los tipos: japoneses, occidentales, damascus y sets de mesa."
      />

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar cuchillo, acero…"
            className="min-w-[200px] flex-1 text-sm"
            aria-label="Buscar"
          />
          <select
            value={steel}
            onChange={(e) => setSteel(e.target.value)}
            className="text-sm font-semibold"
            aria-label="Filtrar por acero"
          >
            {steelOptions.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'Todos los aceros' : s}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="text-sm font-semibold"
            aria-label="Ordenar"
          >
            <option value="featured">Destacados</option>
            <option value="asc">Precio ↑</option>
            <option value="desc">Precio ↓</option>
          </select>
        </div>
      </Reveal>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
        {list.length} resultados
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p: Product, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="glass clip-card mt-10 p-10 text-center text-[var(--muted)]">
          Sin resultados para esa búsqueda.
        </div>
      )}
    </div>
  )
}
