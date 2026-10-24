import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import { getNewsItem } from '../data/catalog'
import { useStoreSection } from '../hooks/useSection'

export default function NewsDetail() {
  const { slug } = useParams()
  const section = useStoreSection()
  const item = slug ? getNewsItem(section, slug) : undefined

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">Noticia no encontrada</h1>
        <div className="mt-8 flex justify-center">
          <Link
            to={`/${section}/noticias`}
            className="btn-knife bg-[var(--accent)] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[var(--accent-ink)]"
          >
            Ver noticias
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Reveal>
        <Link
          to={`/${section}/noticias`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> Todas las noticias
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="clip-tag bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
              {item.tag}
            </span>
            <span className="font-mono-nums text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
              {item.date}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold uppercase leading-tight tracking-[-0.03em] sm:text-4xl">
            {item.title}
          </h1>
          <p className="mt-4 text-base font-semibold italic leading-relaxed text-[var(--muted)]">
            {item.excerpt}
          </p>
        </header>
      </Reveal>

      <div className="glass clip-card premium-shadow mt-8 p-6 sm:p-8">
        {item.body.map((p, i) => (
          <p key={i} className="mt-4 text-sm leading-relaxed text-[var(--ink)] first:mt-0 sm:text-base">
            {p}
          </p>
        ))}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--accent)] hover:underline"
          >
            {item.source ? `Ver en ${item.source}` : 'Ver fuente original'}
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  )
}
