import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import { getCultures } from '../data/catalog'
import { SECTIONS } from '../sections/config'
import { useStoreSection } from '../hooks/useSection'

export default function Culturas() {
  const section = useStoreSection()
  const cultures = getCultures(section)
  const cfg = SECTIONS[section]

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow={`${cfg.label} · Cultura`}
        title={section === 'knifes' ? 'Culturas del filo' : 'Culturas del mundo'}
        subtitle={
          section === 'knifes'
            ? 'Tradiciones cuchilleras, perfiles regionales y herramientas que las representan.'
            : 'Cocinas que definieron cómo come el planeta: sus platos, utensilios y técnicas.'
        }
      />

      {cultures.length === 0 && (
        <div className="glass clip-card mt-10 p-8 text-center text-sm text-[var(--muted)]">
          Estamos preparando contenido para esta sección.
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cultures.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06}>
            <Link
              to={`${cfg.basePath}/culturas/${c.slug}`}
              className="glass premium-shadow premium-shadow-hover clip-hero edge-highlight group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-200 hover:-translate-y-1.5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-6 select-none text-[7.5rem] font-extrabold leading-none text-[var(--accent)] opacity-[0.07] transition-opacity duration-200 group-hover:opacity-[0.13]"
              >
                {c.name.slice(0, 2).toUpperCase()}
              </span>

              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent)]">
                  <MapPin size={12} /> {c.region}
                </span>
                <span className="font-mono-nums text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                  {c.dishes.length} platos
                </span>
              </div>

              <h3 className="relative z-10 mt-4 text-3xl font-extrabold uppercase leading-none tracking-[-0.03em]">
                {c.name}
              </h3>
              <p className="relative z-10 mt-2 text-sm font-semibold italic text-[var(--muted)]">
                «{c.tagline}»
              </p>

              <ul className="relative z-10 mt-5 space-y-1.5">
                {c.dishes.slice(0, 3).map((d) => (
                  <li key={d.name} className="flex items-center gap-2 text-sm">
                    <span className="h-1 w-4 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                    {d.name}
                  </li>
                ))}
              </ul>

              <span className="relative z-10 mt-auto flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                Explorar cultura
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12">
        <motion.div className="glass clip-hero premium-shadow p-7 sm:p-9">
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {section === 'knifes'
              ? 'Explorá perfiles y herramientas vinculados con la tradición cuchillera de cada región.'
              : 'Cada cultura se cruza con la tienda Kitchen: los utensilios esenciales enlazan con productos que los representan.'}
          </p>
        </motion.div>
      </Reveal>
    </div>
  )
}
