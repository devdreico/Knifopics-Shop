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
                className="glass premium-shadow clip-hero edge-highlight group flex h-full flex-col p-7 transition-all hover:-translate-y-1.5"
              >
                <span className="clip-tag inline-flex w-fit bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                  {s.count} entradas
                </span>
                <Icon size={32} className="mt-6 text-[var(--accent)]" strokeWidth={1.6} />
                <h2 className="mt-4 text-2xl font-extrabold uppercase leading-tight">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.description}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  Explorar
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>

      {/* Featured sharpening */}
      <section className="mt-16">
        <SectionTitle eyebrow="Manuales" title="Empezá por afilar" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {sharpeningGuides.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.07}>
              <Link
                to="/wiki/afilado"
                className="glass clip-card flex h-full flex-col p-6 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="clip-tag bg-[var(--surface-2)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--steel)]">
                    {g.level}
                  </span>
                  <span className="text-[11px] text-[var(--muted)]">{g.minutes} min</span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold uppercase leading-snug">{g.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3">{g.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fun facts preview */}
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
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                {f.tag}
              </span>
              <h3 className="mt-2 text-sm font-extrabold uppercase leading-snug">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)] line-clamp-4">{f.body}</p>
            </motion.div>
          ))}
        </div>
        <Reveal className="mt-6">
          <Link
            to="/wiki/datos"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--accent)] hover:underline"
          >
            Ver todos los datos <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* News */}
      <section className="mt-16">
        <SectionTitle eyebrow="Noticias" title="Novedades Knifopics" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latest.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.07}>
              <Link
                to="/wiki/noticias"
                className="glass clip-card flex h-full flex-col p-6 transition-all hover:-translate-y-1"
              >
                <time className="text-[11px] text-[var(--muted)]">
                  {new Date(n.date).toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h3 className="mt-3 text-lg font-extrabold uppercase leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3">{n.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
