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
      <section className="relative isolate overflow-hidden border-b border-[var(--line)]">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="clip-tag inline-flex items-center gap-2 bg-[var(--ink)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white">
              Knifopics <span className="text-[var(--beige)]">·</span> 2 mundos, 1 cocina
            </span>
            <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              El filo y el fuego.
              <span className="mt-2 block text-[var(--muted)]">Elegí tu mundo.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Cuchillos para cortar mejor. Herramientas para cocinar mejor. Explorá dos tiendas
              especializadas con un solo carrito y pago contra entrega.
            </p>
          </motion.div>

          <div className="mt-9 grid gap-4 md:mt-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <Link
                to="/knifes"
                className="group relative flex min-h-[350px] flex-col justify-between overflow-hidden border border-[var(--line-strong)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:min-h-[420px] sm:p-9"
              >
                <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
                <div className="pointer-events-none absolute -right-12 top-1/2 w-[78%] -translate-y-1/2 opacity-25 transition duration-500 group-hover:scale-105 group-hover:opacity-40 sm:-right-6">
                  <KnifeArt kind="chef" tone="blade" />
                </div>
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="clip-tag bg-[var(--ink)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
                    01 · El filo
                  </span>
                  <span className="font-mono-nums text-xs font-bold text-[var(--muted)]">KNIFES</span>
                </div>
                <div className="relative z-10 max-w-md">
                  <h2 className="text-4xl font-extrabold uppercase leading-none tracking-[-0.05em] sm:text-6xl">
                    Knifes
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Cuchillos elegidos por su acero, geometría y propósito. Guías para conocerlos y
                    cuidarlos.
                  </p>
                  <span className="btn-knife mt-6 inline-flex items-center gap-2 bg-[var(--ink)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                    Explorar cuchillos <ArrowRight size={15} />
                  </span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {knifes.length} cuchillos · guías · academia
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              <Link
                to="/kitchen"
                className="group relative flex min-h-[350px] flex-col justify-between overflow-hidden border border-[color-mix(in_srgb,var(--kitchen-accent)_30%,transparent)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:min-h-[420px] sm:p-9"
                style={{
                  background:
                    'linear-gradient(145deg, color-mix(in srgb, var(--kitchen-accent) 10%, white), color-mix(in srgb, var(--kitchen-accent) 22%, var(--surface)))',
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, color-mix(in srgb, var(--kitchen-accent) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--kitchen-accent) 8%, transparent) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="pointer-events-none absolute -left-10 top-1/2 w-[76%] -translate-y-1/2 opacity-35 transition duration-500 group-hover:scale-105 group-hover:opacity-55 sm:left-0">
                  <KnifeArt kind="pan" tone="copper" />
                </div>
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="clip-tag px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white" style={{ background: 'var(--kitchen-accent)' }}>
                    02 · El fuego
                  </span>
                  <span className="font-mono-nums text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Kitchen
                  </span>
                </div>
                <div className="relative z-10 ml-auto max-w-md text-right">
                  <h2 className="text-4xl font-extrabold uppercase leading-none tracking-[-0.05em] sm:text-6xl">
                    Kitchen
                  </h2>
                  <p className="ml-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    Sartenes, ollas y herramientas prácticas. Técnicas y recursos para llevarlas a
                    la cocina.
                  </p>
                  <span
                    className="btn-knife mt-6 inline-flex items-center gap-2 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition hover:brightness-110"
                    style={{ background: 'var(--kitchen-accent)' }}
                  >
                    Explorar Kitchen <ArrowRight size={15} />
                  </span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {kitchen.length} herramientas · recetas · academia
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            <span className="inline-flex items-center gap-2"><ShoppingBag size={13} /> Un carrito combinado</span>
            <span className="hidden h-1 w-1 bg-[var(--line-strong)] sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-2"><Bike size={13} /> Pagás al recibir</span>
          </div>
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
