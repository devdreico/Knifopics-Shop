import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import { getNews } from '../data/catalog'
import { SECTIONS } from '../sections/config'
import { useStoreSection } from '../hooks/useSection'

export default function News() {
  const section = useStoreSection()
  const cfg = SECTIONS[section]
  const items = getNews(section)

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow={`${cfg.label} · Noticias`}
        title="Noticias"
        subtitle={
          section === 'knifes'
            ? 'Artículos editoriales sobre cuchillería, aceros y cuidado del filo. No es un feed en vivo.'
            : 'Notas editoriales de técnicas y utensilios de cocina. No es un feed en vivo.'
        }
      />

      {items.length === 0 ? (
        <div className="glass clip-card mt-10 p-10 text-center text-[var(--muted)]">
          Todavía no hay noticias publicadas.
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-5">
          {items.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.05}>
              <Link
                to={`/${section}/noticias/${n.slug}`}
                className="glass clip-card premium-shadow group flex flex-col gap-3 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-strong)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="clip-tag bg-[var(--surface-2)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] ring-1 ring-[var(--line)]">
                      {n.tag}
                    </span>
                    <span className="font-mono-nums text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                      {n.date}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold uppercase leading-tight sm:text-xl">
                    {n.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{n.excerpt}</p>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink)]">
                  <Newspaper size={15} className="text-[var(--muted)]" />
                  Leer
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
