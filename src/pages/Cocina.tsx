import SectionTitle from '../components/ui/SectionTitle'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import { cocina } from '../data/products'

export default function Cocina() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Objetos"
        title="Cocina"
        subtitle="Tablas, piedras de afilado y almacenamiento — organización poligonal y acabado premium."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cocina.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>

      <Reveal delay={0.2} className="mt-14">
        <div className="glass clip-hero premium-shadow grid-lines relative overflow-hidden p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-extrabold uppercase sm:text-3xl">
              ¿Tu cuchillo necesita filo?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Compra la piedra 1000/6000 y entra a la Academia: guía interactiva con timer,
              calculadora de ángulos y quiz para no equivocarte nunca más.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/producto/whetstone-1000-6000"
                className="clip-btn bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--accent-ink)] transition hover:brightness-110"
              >
                Ver piedra
              </a>
              <a
                href="/academia"
                className="clip-btn glass px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-[var(--accent)]"
              >
                Abrir academia
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
