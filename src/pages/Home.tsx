import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Calculator, Layers, Timer, Sparkles, ShoppingBag } from 'lucide-react'
import PolygonButton from '../components/ui/PolygonButton'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import ProductCard from '../components/ui/ProductCard'
import KnifeArt from '../components/ui/KnifeArt'
import { knifes, products } from '../data/products'
import { news } from '../data/wiki'
import { Link } from 'react-router-dom'

const appModules = [
  { icon: Timer, title: 'Guía de afilado', to: '/academia?m=guia', desc: 'Pasos, ángulos y timer de sesión.' },
  { icon: Sparkles, title: 'Quiz identificador', to: '/academia?m=quiz', desc: 'Pon a prueba tu ojo de cuchillero.' },
  { icon: Calculator, title: 'Calculadora', to: '/academia?m=calc', desc: 'Ángulo y grano según acero y uso.' },
  { icon: Layers, title: 'Flashcards', to: '/academia?m=cards', desc: 'Memoriza acero, filo y cultura.' },
]

export default function Home() {
  const featured = products.slice(0, 4)
  const latestNews = news.slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-20">
          <div className="relative z-10">
            <Reveal>
              <span className="clip-tag inline-flex bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent)]">
                Premium blades · desde 2026
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl md:text-6xl">
                El filo como
                <span className="block text-[var(--accent)]">disciplina</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Cuchillos premium de todos los tipos, objetos de cocina poligonales y la wiki
                + academia definitiva del mundo del cuchillo.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <PolygonButton to="/knifes">
                  Explorar Knifes <ArrowRight size={16} />
                </PolygonButton>
                <PolygonButton to="/wiki" variant="ghost">
                  <BookOpen size={16} /> Abrir Wiki
                </PolygonButton>
                <PolygonButton to="/academia" variant="outline">
                  Academia del filo
                </PolygonButton>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-[var(--muted)]">
                {[
                  ['10', 'productos demo'],
                  ['3', 'temas visuales'],
                  ['4', 'módulos app'],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-2xl font-extrabold text-[var(--ink)]">{n}</div>
                    <div className="uppercase tracking-widest text-[10px]">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="glass premium-shadow clip-hero edge-highlight relative p-6 sm:p-10">
              <div className="absolute inset-0 grid-lines opacity-30" />
              <img
                src="/knifopics-logo.png"
                alt="Knifopics Logo"
                className="relative z-10 mx-auto w-full max-w-md"
              />
              <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">
                {(['chef', 'nakiri', 'cleaver'] as const).map((k, i) => (
                  <motion.div
                    key={k}
                    className="glass clip-card p-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.12 }}
                    whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
                  >
                    <KnifeArt kind={k} tone={i === 1 ? 'gold' : 'blade'} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Selección"
            title="Destacados de la casa"
            subtitle="Diez piezas demo — siete cuchillos y tres objetos de cocina con pago MercadoPago o contra entrega."
          />
          <Reveal delay={0.1}>
            <PolygonButton to="/knifes" variant="outline">
              Ver todo <ArrowRight size={15} />
            </PolygonButton>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* WIKI + APP PROMO */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Link
              to="/wiki"
              className="glass premium-shadow clip-hero edge-highlight group flex h-full flex-col justify-between p-8 transition-all hover:-translate-y-1"
            >
              <div>
                <span className="clip-tag inline-flex bg-[color-mix(in_srgb,var(--steel)_25%,transparent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--steel)]">
                  Wiki del filo
                </span>
                <h3 className="mt-5 text-3xl font-extrabold uppercase leading-tight">
                  Manuales, datos
                  <br />y noticias
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                  Todo el conocimiento de cuchillos en español: afilado paso a paso, curiosidades
                  de acero y actualidad de la marca.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
                Entrar a la wiki
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/academia"
              className="glass premium-shadow clip-hero edge-highlight group flex h-full flex-col justify-between p-8 transition-all hover:-translate-y-1"
            >
              <div>
                <span className="clip-tag inline-flex bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Mini app
                </span>
                <h3 className="mt-5 text-3xl font-extrabold uppercase leading-tight">
                  Academia
                  <br />del filo
                </h3>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {appModules.map(({ icon: Icon, title }) => (
                    <div key={title} className="glass clip-tag flex items-center gap-2 px-3 py-2.5 text-xs font-semibold">
                      <Icon size={14} className="text-[var(--accent)]" />
                      {title}
                    </div>
                  ))}
                </div>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
                Abrir academia
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* KNIVES STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Sección principal"
          title="KNIFES"
          subtitle="Chef, santoku, nakiri, cleaver, pan, paring y sets de mesa — la colección premium."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {knifes.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <PolygonButton to="/knifes" variant="ghost">
            <ShoppingBag size={16} /> Ir al catálogo Knifes
          </PolygonButton>
        </Reveal>
      </section>

      {/* NEWS TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Wiki" title="Últimas noticias" />
          <Reveal delay={0.1}>
            <PolygonButton to="/wiki/noticias" variant="outline">
              Todas <ArrowRight size={15} />
            </PolygonButton>
          </Reveal>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestNews.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.08}>
              <Link
                to={`/wiki/noticias`}
                className="glass clip-card premium-shadow flex h-full flex-col p-6 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="clip-tag bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent)]">
                    {n.tag}
                  </span>
                  <time className="text-[11px] text-[var(--muted)]">
                    {new Date(n.date).toLocaleDateString('es-AR')}
                  </time>
                </div>
                <h3 className="mt-4 text-lg font-extrabold uppercase leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3">{n.excerpt}</p>
                <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  Leer →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
