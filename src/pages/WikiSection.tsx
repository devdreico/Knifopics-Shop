import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, ChevronDown, Lightbulb } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import PolygonButton from '../components/ui/PolygonButton'
import { sharpeningGuides, funFacts, news, type WikiSectionId } from '../data/wiki'

function GuideCard({ guide }: { guide: (typeof sharpeningGuides)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass clip-card premium-shadow overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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
          <h3 className="mt-3 text-xl font-extrabold uppercase leading-snug">{guide.title}</h3>
          <p className="mt-1.5 text-sm text-[var(--muted)]">{guide.excerpt}</p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="shrink-0 text-[var(--accent)]">
          <ChevronDown size={22} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--line)]"
          >
            <ol className="flex flex-col gap-5 p-6">
              {guide.steps.map((step, i) => (
                <li key={step.title} className="relative flex gap-4">
                  <span className="clip-tag flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--accent)] text-xs font-extrabold text-[var(--accent-ink)]">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold uppercase tracking-wide">{step.title}</h4>
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
    </div>
  )
}

export default function WikiSection() {
  const { section } = useParams()
  const id = section as WikiSectionId | undefined

  if (id !== 'afilado' && id !== 'datos' && id !== 'noticias') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">Sección no encontrada</h1>
        <div className="mt-8 flex justify-center">
          <PolygonButton to="/wiki">Volver a la Wiki</PolygonButton>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Reveal>
        <Link
          to="/wiki"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> Wiki
        </Link>
      </Reveal>

      {id === 'afilado' && (
        <>
          <div className="mt-6">
            <SectionTitle
              eyebrow="Wiki · Afilado"
              title="Manuales de afilado"
              subtitle="De la piedra mojada al test del papel. Tres manuales expandibles, paso a paso."
            />
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {sharpeningGuides.map((g, i) => (
              <Reveal key={g.slug} delay={i * 0.08}>
                <GuideCard guide={g} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <div className="glass clip-hero p-7">
              <h3 className="text-lg font-extrabold uppercase">¿Prefieres el modo app?</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                La Academia incluye una guía interactiva con timer real por sesión de afilado.
              </p>
              <div className="mt-5">
                <PolygonButton to="/academia">Abrir Academia</PolygonButton>
              </div>
            </div>
          </Reveal>
        </>
      )}

      {id === 'datos' && (
        <>
          <div className="mt-6">
            <SectionTitle
              eyebrow="Wiki · Curiosidades"
              title="Datos curiosos"
              subtitle="Fichas rápidas de acero, forja, historia y cultura del cuchillo."
            />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {funFacts.map((f, i) => (
              <motion.article
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.45 }}
                className="glass clip-card p-6"
              >
                <span className="clip-tag inline-block bg-[var(--ink)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-ink)]">
                  {f.tag}
                </span>
                <h3 className="mt-3 text-lg font-extrabold uppercase leading-snug">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{f.body}</p>
              </motion.article>
            ))}
          </div>
        </>
      )}

      {id === 'noticias' && (
        <>
          <div className="mt-6">
            <SectionTitle
              eyebrow="Wiki · Noticias"
              title="Noticias"
              subtitle="Lanzamientos, actualizaciones de wiki y vida de la marca."
            />
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {news.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.07}>
                <article className="glass clip-card premium-shadow p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="clip-tag bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-ink)]">
                      {n.tag}
                    </span>
                    <time className="text-xs text-[var(--muted)]">
                      {new Date(n.date).toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <h3 className="mt-4 text-2xl font-extrabold uppercase leading-tight">{n.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{n.excerpt}</p>
                  <div className="mt-4 flex flex-col gap-3">
                    {n.body.map((p) => (
                      <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-[var(--muted)]">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
