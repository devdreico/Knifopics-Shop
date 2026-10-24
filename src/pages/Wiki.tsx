import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import { getNews, getWikiFacts, getWikiTopics } from '../data/catalog'
import { SECTIONS } from '../sections/config'
import { useStoreSection } from '../hooks/useSection'

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Wiki() {
  const section = useStoreSection()
  const cfg = SECTIONS[section]
  const base = cfg.basePath

  const topics = getWikiTopics(section)
  const facts = getWikiFacts(section)
  const latest = getNews(section).slice(0, 2)

  const subtitle =
    section === 'knifes'
      ? 'Aceros, técnicas de afilado y cuidado del filo: manuales, datos curiosos y noticias en un solo lugar.'
      : 'Técnicas, utensilios y cocina: manuales, datos curiosos y noticias para cocinar mejor.'

  const factsTitle = section === 'knifes' ? 'Curiosidades del filo' : 'Curiosidades de cocina'

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle eyebrow={`${cfg.label} · Wiki`} title="Wiki" subtitle={subtitle} />

      {topics.length > 0 && (
        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {topics.map((topic, i) => (
            <Reveal key={topic.id} delay={i * 0.08}>
              <Link
                to={`/${section}/wiki/${topic.id}`}
                className="glass premium-shadow premium-shadow-hover clip-hero edge-highlight group flex h-full flex-col p-7 transition-all duration-200 hover:-translate-y-1.5"
              >
                <span className="clip-tag relative z-10 inline-flex w-fit bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent-ink)]">
                  {topic.articles.length}{' '}
                  {topic.articles.length === 1 ? 'artículo' : 'artículos'}
                </span>
                <h2 className="relative z-10 mt-6 text-2xl leading-tight font-extrabold uppercase tracking-[-0.03em]">
                  {topic.title}
                </h2>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {topic.description}
                </p>
                <span className="relative z-10 mt-auto flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                  Explorar
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </section>
      )}

      {facts.length > 0 && (
        <section className="mt-16">
          <SectionTitle eyebrow="Datos curiosos" title={factsTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.45 }}
                className="glass clip-tag flex flex-col p-5"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {f.tag}
                </span>
                <h3 className="mt-2 text-sm leading-snug font-extrabold uppercase">{f.title}</h3>
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-[var(--muted)]">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {latest.length > 0 && (
        <section className="mt-16">
          <SectionTitle eyebrow="Noticias" title="Últimas novedades" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {latest.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.07}>
                <Link
                  to={`/${section}/noticias/${n.slug}`}
                  className="glass clip-card group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-strong)]"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="clip-tag bg-[var(--beige-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)] ring-1 ring-[var(--beige)]">
                      {n.tag}
                    </span>
                    <time className="font-mono-nums text-[11px] text-[var(--muted)]">
                      {formatDate(n.date)}
                    </time>
                  </div>
                  <h3 className="mt-4 text-lg leading-snug font-extrabold uppercase">{n.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                    {n.excerpt}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                    Leer noticia
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <Link
              to={`/${section}/noticias`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[var(--ink)] hover:text-[var(--accent)]"
            >
              Todas las noticias <ArrowRight size={15} />
            </Link>
          </Reveal>
        </section>
      )}

      <section className="mt-16 grid gap-5 md:grid-cols-2">
        <Reveal>
          <Link
            to={`${base}/guias`}
            className="glass clip-hero premium-shadow group flex h-full flex-col justify-between p-7 transition-all duration-200 hover:-translate-y-1"
          >
            <div>
              <span className="clip-tag inline-flex bg-[var(--beige-soft)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] ring-1 ring-[var(--beige)]">
                Rápido
              </span>
              <BookOpen size={30} className="relative z-10 mt-5 text-[var(--ink)]" strokeWidth={1.6} />
              <h3 className="mt-4 text-2xl leading-tight font-extrabold uppercase">Guías</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {section === 'knifes'
                  ? 'Empuñadura, técnica y mantenimiento, hoja por hoja, en formato stepper.'
                  : 'Mise en place, materiales y técnicas de cocina, paso a paso.'}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">
              Abrir guías{' '}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            to={`${base}/academia`}
            className="glass clip-hero premium-shadow group flex h-full flex-col justify-between p-7 transition-all duration-200 hover:-translate-y-1"
          >
            <div>
              <span className="clip-tag inline-flex bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent-ink)]">
                Mini app
              </span>
              <GraduationCap
                size={30}
                className="relative z-10 mt-5 text-[var(--ink)]"
                strokeWidth={1.6}
              />
              <h3 className="mt-4 text-2xl leading-tight font-extrabold uppercase">Academia</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {section === 'knifes'
                  ? 'Quiz identificador, calculadora de ángulos, afilado con timer y flashcards.'
                  : 'Quiz, calculadora de conversiones, sesiones con timer y flashcards.'}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">
              Abrir academia{' '}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
