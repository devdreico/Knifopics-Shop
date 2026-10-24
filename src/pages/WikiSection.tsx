import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Clock, Lightbulb } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import PolygonButton from '../components/ui/PolygonButton'
import { getWikiTopic } from '../data/catalog'
import type { Guide } from '../data/types'
import { useStoreSection } from '../hooks/useSection'
import { SECTIONS } from '../sections/config'

function ArticleCard({ guide }: { guide: Guide }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="glass clip-card premium-shadow overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="clip-tag bg-[var(--beige-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)] ring-1 ring-[var(--beige)]">
              {guide.level}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[var(--muted)]">
              <Clock size={12} /> {guide.minutes} min
            </span>
          </div>
          <h2 className="mt-3 text-xl font-extrabold uppercase leading-snug">{guide.title}</h2>
          <p className="mt-1.5 text-sm text-[var(--muted)]">{guide.excerpt}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="shrink-0 text-[var(--accent)]"
        >
          <ChevronDown size={22} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--line)]"
          >
            <ol className="flex flex-col gap-5 p-6">
              {guide.steps.map((step, index) => (
                <li key={`${guide.slug}-${step.title}`} className="flex gap-4">
                  <span className="clip-tag flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--accent)] text-xs font-extrabold text-[var(--accent-ink)]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
                    {step.tip && (
                      <p className="mt-2 flex items-start gap-2 border-l-2 border-[var(--beige)] pl-2 text-xs text-[var(--ink)]">
                        <Lightbulb size={13} className="mt-0.5 shrink-0" />
                        {step.tip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function WikiSection() {
  const { topic: topicId } = useParams()
  const section = useStoreSection()
  const cfg = SECTIONS[section]
  const topic = topicId ? getWikiTopic(section, topicId) : undefined

  if (!topic) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">Tema no encontrado</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          No encontramos ese tema en la wiki de {cfg.label}.
        </p>
        <div className="mt-8 flex justify-center">
          <PolygonButton to={`${cfg.basePath}/wiki`}>Volver a la Wiki</PolygonButton>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Reveal>
        <Link
          to={`${cfg.basePath}/wiki`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> Wiki {cfg.label}
        </Link>
      </Reveal>
      <div className="mt-6">
        <SectionTitle eyebrow={`${cfg.label} · Wiki`} title={topic.title} subtitle={topic.description} />
      </div>
      {topic.articles.length > 0 ? (
        <div className="mt-10 flex flex-col gap-5">
          {topic.articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.06}>
              <ArticleCard guide={article} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="glass clip-card mt-10 p-8 text-center text-sm text-[var(--muted)]">
          Todavía no hay artículos publicados en este tema.
        </div>
      )}
      <Reveal className="mt-10">
        <div className="glass clip-hero p-7">
          <h2 className="text-lg font-extrabold uppercase">Seguí aprendiendo</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Encontrá más recursos prácticos en la academia de {cfg.label}.
          </p>
          <div className="mt-5">
            <PolygonButton to={`${cfg.basePath}/academia`}>Abrir Academia</PolygonButton>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
