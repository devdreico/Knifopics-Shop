import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, RotateCcw } from 'lucide-react'
import { getProducts } from '../data/catalog'
import { SECTIONS, type DiscoveryCard, type StoreSection } from '../sections/config'
import ProductCard from '../components/ui/ProductCard'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import { useStoreSection } from '../hooks/useSection'
import type { Product } from '../data/types'

type Sort = 'featured' | 'asc' | 'desc'

const ALL = 'all'

const familyOf = (p: Product): string | undefined => p.family
const steelOf = (p: Product): string => (p.steel ?? '').split('/')[0].trim()

const promo: Record<StoreSection, { title: string; body: string }> = {
  knifes: {
    title: 'Academia del filo',
    body: 'Piedras 1000 y 6000, calculadora de ángulos, quiz y sesiones con timer: aprendé a afilar y a mantener el filo como un profesional.',
  },
  kitchen: {
    title: 'Academia de cocina',
    body: 'Conversiones de medidas, técnicas paso a paso, quiz y sesiones con timer: cociná con precisión de restaurante.',
  },
}

export default function SectionStore() {
  const section: StoreSection = useStoreSection()
  const cfg = SECTIONS[section]
  const base = getProducts(section)

  const [q, setQ] = useState('')
  const [family, setFamily] = useState(ALL)
  const [steel, setSteel] = useState(ALL)
  const [sort, setSort] = useState<Sort>('featured')

  const familyOptions = useMemo(() => {
    const set = new Set<string>()
    base.forEach((p) => {
      const f = familyOf(p)
      if (f) set.add(f)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'))
  }, [base])

  const steelOptions = useMemo(() => {
    const set = new Set<string>()
    base.forEach((p) => {
      const first = steelOf(p)
      if (first) set.add(first)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'))
  }, [base])

  const list = useMemo(() => {
    let out = [...base]
    if (family !== ALL) out = out.filter((p) => familyOf(p) === family)
    if (section === 'knifes' && steel !== ALL) out = out.filter((p) => steelOf(p) === steel)
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.short.toLowerCase().includes(needle) ||
          p.description.toLowerCase().includes(needle) ||
          (p.steel ?? '').toLowerCase().includes(needle) ||
          (familyOf(p) ?? '').toLowerCase().includes(needle),
      )
    }
    if (sort === 'asc') out.sort((a, b) => a.price - b.price)
    if (sort === 'desc') out.sort((a, b) => b.price - a.price)
    return out
  }, [base, family, steel, section, q, sort])

  const clear = () => {
    setQ('')
    setFamily(ALL)
    setSteel(ALL)
    setSort('featured')
  }

  const hasFilters = q.trim() !== '' || family !== ALL || steel !== ALL || sort !== 'featured'

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow={`Sección ${cfg.index}`}
        title={cfg.label.toUpperCase()}
        subtitle={cfg.subtitle}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cfg.discovery.map((d: DiscoveryCard, i: number) => {
          const Icon = d.icon
          return (
            <Reveal key={d.to} delay={i * 0.06}>
              <Link
                to={d.to}
                className="glass premium-shadow clip-card edge-highlight group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <Icon size={26} strokeWidth={1.7} className="shrink-0" />
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--ink)]"
                  />
                </div>
                <h3 className="mt-5 text-lg leading-tight font-extrabold uppercase tracking-[-0.02em]">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{d.body}</p>
              </Link>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.08} className="mt-10">
        <div className="glass clip-card flex flex-wrap items-center gap-3 p-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={cfg.searchPlaceholder}
            className="min-w-[200px] flex-1 text-sm"
            aria-label="Buscar"
          />

          <select
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            className="text-sm font-semibold"
            aria-label="Familia"
          >
            <option value={ALL}>Todos</option>
            {familyOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          {section === 'knifes' && (
            <select
              value={steel}
              onChange={(e) => setSteel(e.target.value)}
              className="text-sm font-semibold"
              aria-label={cfg.filterLabel}
            >
              <option value={ALL}>Todos los aceros</option>
              {steelOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}

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

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono-nums text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
          {list.length} resultados
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            <RotateCcw size={13} /> Limpiar filtros
          </button>
        )}
      </div>

      {list.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      ) : (
        <Reveal className="mt-6">
          <div className="glass clip-card p-10 text-center">
            <p className="text-[var(--muted)]">Sin resultados para esa búsqueda.</p>
            <button
              type="button"
              onClick={clear}
              className="btn-knife mt-5 inline-flex items-center gap-2 bg-[var(--accent)] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[var(--accent-ink)] transition hover:brightness-110"
            >
              <RotateCcw size={14} /> Limpiar filtros
            </button>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.1} className="mt-12">
        <Link
          to={`${cfg.basePath}/academia`}
          className="glass premium-shadow clip-hero edge-highlight group relative flex flex-col gap-6 overflow-hidden p-7 sm:p-9 md:flex-row md:items-center md:justify-between"
        >
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="relative z-10 flex flex-1 items-start gap-4">
            <span className="clip-tag mt-1 inline-flex shrink-0 bg-[var(--ink)] px-3 py-1 text-[var(--accent-ink)]">
              <GraduationCap size={16} />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--muted)]">
                {cfg.label} · Academia
              </span>
              <h3 className="mt-2 text-2xl leading-tight font-extrabold uppercase tracking-[-0.03em]">
                {promo[section].title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                {promo[section].body}
              </p>
            </div>
          </div>
          <span className="relative z-10 inline-flex shrink-0 items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em]">
            Ir a la academia
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </Reveal>
    </div>
  )
}
