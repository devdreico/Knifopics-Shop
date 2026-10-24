import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Crown, Medal } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import { getRankings } from '../data/catalog'
import type { Ranking } from '../data/types'
import { useStoreSection } from '../hooks/useSection'
import { SECTIONS } from '../sections/config'

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--accent)] text-[var(--muted)]">
        <span className="sr-only">Puesto 1</span>
        <Crown size={20} className="text-[var(--accent-ink)]" />
      </span>
    )
  }
  if (rank <= 3) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--beige-soft)] text-[var(--ink)] ring-1 ring-[var(--beige)]">
        <Medal size={18} />
        <span className="sr-only">Puesto {rank}</span>
      </span>
    )
  }
  return (
    <span className="font-mono-nums flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--surface-2)] text-lg font-extrabold text-[var(--muted)] ring-1 ring-[var(--line)]">
      {rank}
    </span>
  )
}

function RankingList({ ranking }: { ranking: Ranking }) {
  return (
    <ol className="flex flex-col gap-3">
      {ranking.items.map((item, i) => (
        <motion.li
          key={item.name}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="glass clip-card premium-shadow flex items-start gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
        >
          <RankBadge rank={item.rank} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-extrabold uppercase leading-tight sm:text-lg">
                {item.name}
              </h3>
              {item.meta && (
                <span className="clip-tag bg-[var(--surface-2)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--accent)] ring-1 ring-[var(--line)]">
                  {item.meta}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

export default function Rankings() {
  const section = useStoreSection()
  const cfg = SECTIONS[section]
  const rankings = getRankings(section)
  const [activeId, setActiveId] = useState('')
  const active = rankings.find((r) => r.id === activeId) ?? rankings[0]

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow={`${cfg.label} · Rankings`}
        title={section === 'knifes' ? 'Rankings del filo' : 'Rankings de cocina'}
        subtitle={
          section === 'knifes'
            ? 'Comparativas editoriales de perfiles, aceros y cuidado de cuchillos.'
            : 'Selecciones editoriales de utensilios, cocinas del mundo y técnicas.'
        }
      />

      {rankings.length === 0 || !active ? (
        <div className="glass clip-card mt-10 p-8 text-center text-sm text-[var(--muted)]">
          Estamos preparando rankings para esta sección.
        </div>
      ) : (
        <>
      {/* Tabs */}
      <Reveal delay={0.08}>
        <div className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Rankings">
          {rankings.map((r) => {
            const isActive = r.id === activeId
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(r.id)}
                className={`btn-knife relative px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] transition-all ${
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'glass text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {r.title.replace(/^Top \d+ |^Las \d+ |^Los \d+ /, '')}
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Activo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9"
        >
          <div className="glass clip-hero premium-shadow edge-highlight relative overflow-hidden p-7 sm:p-9">
            <div className="absolute inset-0 grid-lines opacity-30" />
            <div className="relative z-10">
              <span className="clip-tag inline-flex bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
                {active.tag}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
                {active.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                {active.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <RankingList ranking={active} />
          </div>
        </motion.div>
      </AnimatePresence>

      <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          {section === 'knifes'
            ? 'Encontrá cuchillos y herramientas de cuidado en la tienda Knifes.'
            : 'Encontrá utensilios de cocina en la tienda Kitchen.'}
        </p>
        <Link
          to={cfg.basePath}
          className="btn-knife inline-flex items-center gap-2 bg-[var(--accent)] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[var(--accent-ink)] transition hover:brightness-110"
        >
          Ir a la tienda <ArrowRight size={14} />
        </Link>
      </Reveal>
        </>
      )}
    </div>
  )
}
