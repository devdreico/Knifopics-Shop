import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Boxes, ShoppingBag, Bike, Send } from 'lucide-react'
import PolygonButton from '../components/ui/PolygonButton'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import ProductCard from '../components/ui/ProductCard'
import KnifeArt from '../components/ui/KnifeArt'
import { getProducts } from '../data/catalog'

const knifes = getProducts('knifes')
const kitchen = getProducts('kitchen')

const knifesFeatures = [
  'Tienda SOLO cuchillos premium',
  'Guías y wiki completas del filo',
  'Noticias de cuchillería',
  'Academia, culturas y rankings',
]

const kitchenFeatures = [
  'Tienda de sartenes y gadgets',
  'Guías y wiki de cocina',
  'Noticias gastronómicas',
  'Academia, culturas y rankings',
]

const steps = [
  {
    icon: Boxes,
    title: 'Elegí tu sección',
    body: 'La barra central del header conmuta entre KNIFES y KITCHEN. Cada una con su tienda, sus guías y su cultura.',
  },
  {
    icon: ShoppingBag,
    title: 'Un carrito combinado',
    body: 'Sumá cuchillos y sartenes juntos: el carrito es uno solo, persiste entre secciones y suma el total de todo.',
  },
  {
    icon: Bike,
    title: 'Contra entrega total',
    body: 'Confirmá el pedido desde el checkout. Pagás en efectivo cuando recibís.',
  },
]

export default function Home() {
  const featured = [knifes[0], knifes[1], kitchen[0], kitchen[2]]

  return (
    <div>
      {/* ——— HERO 50/50: KNIVES | KITCHEN ——— */}
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="pointer-events-none absolute left-1/2 top-7 z-30 hidden -translate-x-1/2 md:block">
          <span className="clip-tag bg-[var(--ink)] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white">
            50 / 50
          </span>
        </div>

        <div className="flex flex-col md:min-h-[calc(100dvh-4rem)] md:flex-row">
          {/* KNIVES */}
          <Link
            to="/knifes"
            className="group relative flex flex-1 flex-col justify-center overflow-hidden border-b border-[var(--line)] px-6 py-16 transition-[flex-grow] duration-500 ease-out hover:flex-[1.3] sm:px-10 md:border-b-0 md:border-r md:py-20"
          >
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
            <div className="pointer-events-none absolute -right-16 top-1/2 w-[380px] -translate-y-1/2 opacity-20 transition-transform duration-700 group-hover:scale-110 sm:w-[460px]">
              <KnifeArt kind="chef" tone="blade" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-xl"
            >
              <span className="clip-tag inline-flex bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white">
                Sección 01
              </span>
              <h1 className="mt-6 text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Knifes
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                El filo como disciplina: cuchillos premium, wikis completísimas, pasos por cuchillo
                y guías interactivas con la academia del filo.
              </p>
              <ul className="mt-7 grid gap-2.5">
                {knifesFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold">
                    <span className="h-1.5 w-6 shrink-0 bg-[var(--ink)]" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="btn-knife mt-9 inline-flex items-center gap-2 bg-[var(--accent)] px-7 py-3.5 pr-9 text-sm font-bold uppercase tracking-[0.08em] text-[var(--accent-ink)] transition-all hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)]">
                Entrar a Knifes <ArrowRight size={16} />
              </span>
            </motion.div>
          </Link>

          {/* KITCHEN */}
          <Link
            to="/kitchen"
            className="group relative flex flex-1 flex-col justify-center overflow-hidden px-6 py-16 transition-[flex-grow] duration-500 ease-out hover:flex-[1.3] sm:px-10 md:py-20"
            style={{
              background:
                'linear-gradient(160deg, rgba(253,230,138,0.32) 0%, rgba(255,237,213,0.7) 100%)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 grid-lines opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(194,65,12,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(194,65,12,0.06) 1px, transparent 1px)',
              }}
            />
            <div className="pointer-events-none absolute -left-16 top-1/2 w-[380px] -translate-y-1/2 opacity-20 transition-transform duration-700 group-hover:scale-110 sm:w-[460px] md:left-auto md:-right-16">
              <KnifeArt kind="pan" tone="copper" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-xl md:ml-auto"
            >
              <span
                className="clip-tag inline-flex px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white"
                style={{ background: 'var(--kitchen-accent)' }}
              >
                Sección 02
              </span>
              <h1 className="mt-6 text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Kitchen
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Sartenes, ollas y gadgets con guías de cocina, culturas gastronómicas del mundo y
                los rankings famosos — todo su e-commerce propio.
              </p>
              <ul className="mt-7 grid gap-2.5">
                {kitchenFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold">
                    <span
                      className="h-1.5 w-6 shrink-0"
                      aria-hidden="true"
                      style={{ background: 'var(--kitchen-accent)' }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <span
                className="btn-knife mt-9 inline-flex items-center gap-2 px-7 py-3.5 pr-9 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:brightness-110"
                style={{ background: 'var(--kitchen-accent)' }}
              >
                Entrar a Kitchen <ArrowRight size={16} />
              </span>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ——— CÓMO FUNCIONA ——— */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionTitle
          eyebrow="Un solo shop"
          title="Dos secciones, un carrito"
          subtitle="Comprás en cualquier lado del sitio: el carrito combinado, el pedido y el checkout son únicos."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="glass clip-card premium-shadow edge-highlight flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="clip-tag bg-[var(--ink)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
                    0{i + 1}
                  </span>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-xl font-extrabold uppercase leading-tight">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— DESTACADOS COMBINADOS ——— */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Selección mixta"
            title="Destacados de ambas secciones"
            subtitle="Dos joyas del filo y dos piezas de cocina — todos al mismo carrito."
          />
          <Reveal delay={0.1}>
            <PolygonButton to="/carrito" variant="outline">
              <ShoppingBag size={15} /> Ver carrito
            </PolygonButton>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center gap-3">
          <PolygonButton to="/knifes">
            Tienda Knifes <ArrowRight size={15} />
          </PolygonButton>
          <PolygonButton to="/kitchen" variant="beige">
            Tienda Kitchen <ArrowRight size={15} />
          </PolygonButton>
        </Reveal>
      </section>

      {/* ——— CTA FORMSPREE / CONTRA ENTREGA ——— */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="glass premium-shadow clip-hero edge-highlight relative overflow-hidden p-8 sm:p-12">
            <div className="absolute inset-0 grid-lines opacity-40" />
            <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="clip-tag inline-flex bg-[var(--beige-soft)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.24em] ring-1 ring-[var(--beige)]">
                  Checkout
                </span>
                <h3 className="mt-4 text-2xl font-extrabold uppercase sm:text-3xl">
                  Todo contra entrega, cero fricción
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Armás el pedido desde el checkout y coordinás la entrega. Pagás en efectivo al
                  recibir, sin pago online.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <PolygonButton to="/checkout">
                  <Send size={15} /> Ir al checkout
                </PolygonButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
