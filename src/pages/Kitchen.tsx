import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CookingPot, Globe2, Trophy } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import { kitchen, type Product } from '../data/products'

type Sort = 'featured' | 'asc' | 'desc'

const discovery = [
  {
    to: '/kitchen/guias',
    icon: CookingPot,
    title: 'Guías de cocina',
    body: 'Hierro fundido, wok, cocción lenta y mise en place — paso a paso.',
  },
  {
    to: '/kitchen/culturas',
    icon: Globe2,
    title: 'Culturas del mundo',
    body: 'Japón, Italia, México, Francia, Argentina y Perú con sus platos y utensilios.',
  },
  {
    to: '/kitchen/rankings',
    icon: Trophy,
    title: 'Rankings famosos',
    body: 'Top sartenes, cocinas del mundo, gadgets y platos más difíciles.',
  },
]

export default function Kitchen() {
  const [sort, setSort] = useState<Sort>('featured')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    let out = [...kitchen]
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
  }, [sort, q])

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Sección 02"
        title="KITCHEN"
        subtitle="Sartenes, ollas, gadgets y objetos generales de cocina. Todo contra entrega, todo a tu carrito combinado."
      />

      {/* Descubrimiento: contenidos de la sección */}
      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {discovery.map(({ to, icon: Icon, title, body }, i) => (
          <Reveal key={to} delay={i * 0.07}>
            <Link
              to={to}
              className="glass clip-card premium-shadow group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-strong)]"
            >
              <div className="flex items-center justify-between">
                <Icon size={24} strokeWidth={1.7} />
                <ArrowRight
                  size={15}
                  className="text-[var(--muted)] transition-transform group-hover:translate-x-1"
                />
              </div>
              <h3 className="mt-4 text-lg font-extrabold uppercase">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Filtros */}
      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar sartén, gadget, material…"
            className="min-w-[220px] flex-1 text-sm"
            aria-label="Buscar productos de cocina"
          />
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

      <p className="mt-4 font-mono-nums text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
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

      {/* Promo academia (afilado vive en Knifes) */}
      <Reveal delay={0.15} className="mt-14">
        <div className="glass clip-hero premium-shadow grid-lines relative overflow-hidden p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-extrabold uppercase sm:text-3xl">
              ¿Tus cuchillos necesitan filo?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              La piedra 1000/6000 está en esta tienda, y la guía interactiva con timer vive en la
              Academia de la sección Knifes — con calculadora de ángulos y quiz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/producto/whetstone-1000-6000"
                className="btn-knife bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--accent-ink)] transition hover:brightness-110"
              >
                Ver piedra
              </Link>
              <Link
                to="/knifes/academia"
                className="btn-knife glass px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-[var(--accent)]"
              >
                Abrir academia
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
