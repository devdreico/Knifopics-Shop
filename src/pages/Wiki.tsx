import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Hammer, Lightbulb, Newspaper } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import { news, sharpeningGuides, funFacts, wikiSections } from '../data/wiki'

const icons = {
  afilado: Hammer,
  datos: Lightbulb,
  noticias: Newspaper,
}

export default function Wiki() {
  const latest = news.slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Conocimiento"
        title="Wiki del filo"
        subtitle="Solo cuchillos: manuales de afilado, datos curiosos y noticias. Conocimiento en español, sin relleno."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {wikiSections.map((s, i) => {
          const Icon = icons[s.id]
          return (
            <Reveal key={s.id} delay={i * 0.08}>
              <Link
                to={`/wiki/${s.id}`}
                className="glass premium-shadow premium-shadow-hover clip-hero edge-highlight group flex h-full flex-col p-7 transition-all duration-200 hover:-translate-y-1.5"
              >
                <span className="clip-tag relative z-10 inline-flex w-fit bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent-ink)]">
                  {s.count} entradas
                </span>
                <Icon
                  size={32}
                  className="relative z-10 mt-6 text-[var(--ink)]"
                  strokeWidth={1.6}
                />
                <h2 className="relative z-10 mt-4 text-2xl leading-tight font-extrabold uppercase tracking-[-0.03em]">
                  {s.title}
                </h2>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {s.description}
                </p>
                <span className="relative z-10 mt-auto flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                  Explorar
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>

      <section className="mt-16">
        <SectionTitle eyebrow="Manuales" title="Empezá por afilar" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {sharpeningGuides.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.07}>
              <Link
                to="/wiki/afilado"
                className="glass clip-card flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-strong)]"
              >
                <div className="flex items-center justify-between">
                  <span className="clip-tag bg-[var(--beige-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink)] ring-1 ring-[var(--beige)]">
                    {g.level}
                  </span>
                  <span className="font-mono-nums text-[11px] text-[var(--muted)]">
                    {g.minutes} min
                  </span>
                </div>
                <h3 className="mt-4 text-lg leading-snug font-extrabold uppercase">{g.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">{g.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionTitle eyebrow="Datos curiosos" title="Curiosidades de acero" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {funFacts.slice(0, 4).map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="glass clip-tag p-5"
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
        <Reveal className="mt-6">
          <Link
            to="/wiki/datos"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[var(--ink)] hover:underline"
          >
            Ver todos los datos <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>

      <section className="mt-16">
        <SectionTitle eyebrow="Noticias" title="Novedades Knifopics" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latest.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.07}>
              <Link
                to="/wiki/noticias"
                className="glass clip-card flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--line-strong)]"
              >
                <time className="font-mono-nums text-[11px] text-[var(--muted)]">
                  {new Date(n.date).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h3 className="mt-3 text-lg leading-snug font-extrabold uppercase">{n.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">{n.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
