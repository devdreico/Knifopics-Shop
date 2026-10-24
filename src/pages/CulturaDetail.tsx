import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Lightbulb, MapPin, ShoppingBag } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import PolygonButton from '../components/ui/PolygonButton'
import { getProduct, getCulture } from '../data/catalog'
import { useStoreSection } from '../hooks/useSection'

export default function CulturaDetail() {
  const { slug } = useParams()
  const section = useStoreSection()
  const culture = slug ? getCulture(section, slug) : undefined

  if (!culture) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">Cultura no encontrada</h1>
        <div className="mt-8 flex justify-center">
          <PolygonButton to="/kitchen/culturas">Ver culturas</PolygonButton>
        </div>
      </div>
    )
  }

  const essentials = culture.essentials.map((e) => ({
    ...e,
    product: e.productSlug ? getProduct(e.productSlug) : undefined,
  }))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <Link
          to="/kitchen/culturas"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> Culturas del mundo
        </Link>
      </Reveal>

      {/* Hero de cultura */}
      <div
        className="glass clip-hero premium-shadow edge-highlight relative mt-6 overflow-hidden p-8 sm:p-12"
        style={{
          background:
            'linear-gradient(150deg, color-mix(in srgb, var(--accent) 7%, transparent) 0%, color-mix(in srgb, var(--accent) 16%, transparent) 100%)',
        }}
      >
        <div className="absolute inset-0 grid-lines opacity-40" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-10 select-none text-[9rem] font-extrabold leading-none text-[var(--accent)] opacity-[0.09]"
        >
          {culture.name.slice(0, 2).toUpperCase()}
        </span>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--accent)]">
            <MapPin size={12} /> {culture.region}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold uppercase leading-none tracking-[-0.04em] sm:text-5xl">
            {culture.name}
          </h1>
          <p className="mt-3 text-lg font-semibold italic text-[var(--muted)]">«{culture.tagline}»</p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {culture.description}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Platos */}
        <section>
          <SectionTitle eyebrow="Platos icónicos" title="Qué se come" />
          <div className="mt-7 flex flex-col gap-4">
            {culture.dishes.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.06}>
                <article className="glass clip-card flex gap-4 p-5">
                  <span className="font-mono-nums flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--ink)] text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold uppercase leading-tight">{d.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{d.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Esenciales + tip */}
        <div className="flex flex-col gap-8">
          <section>
            <SectionTitle eyebrow="Utensilios" title="Esenciales de la sección" />
            <div className="mt-7 flex flex-col gap-3">
              {essentials.map((e, i) => (
                <Reveal key={e.name} delay={i * 0.06}>
                  {e.product ? (
                    <Link
                      to={`/producto/${e.product.slug}`}
                      className="glass clip-tag group flex items-center justify-between gap-4 px-5 py-4 transition-all hover:border-[var(--line-strong)] hover:bg-[var(--glass-strong)]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold uppercase">{e.name}</p>
                        <p className="font-mono-nums mt-0.5 text-xs font-bold">
                          ${e.product.price.toLocaleString('es-AR')}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--accent)]">
                        Ver
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ) : (
                    <div className="glass clip-tag flex items-center gap-3 px-5 py-4 text-sm font-semibold">
                      <ShoppingBag size={15} className="shrink-0 text-[var(--muted)]" />
                      {e.name}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal delay={0.15}>
            <div className="glass clip-hero p-6">
              <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                <Lightbulb size={13} /> El truco de la región
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]">{culture.tip}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3">
              <PolygonButton to="/kitchen" variant="beige">
                Ir a la tienda Kitchen
              </PolygonButton>
              <PolygonButton to="/kitchen/culturas" variant="ghost">
                Todas las culturas
              </PolygonButton>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
