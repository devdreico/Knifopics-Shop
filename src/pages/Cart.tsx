import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Bike } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import PolygonButton from '../components/ui/PolygonButton'
import Reveal from '../components/ui/Reveal'
import KnifeArt from '../components/ui/KnifeArt'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { lines, total, setQty, remove, count, clear } = useCart()

  const knifesCount = lines
    .filter((l) => l.product.category === 'knifes')
    .reduce((s, l) => s + l.qty, 0)
  const kitchenCount = lines
    .filter((l) => l.product.category === 'kitchen')
    .reduce((s, l) => s + l.qty, 0)

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="glass clip-hero premium-shadow mx-auto flex max-w-md flex-col items-center p-10">
          <ShoppingBag size={40} className="text-[var(--accent)]" />
          <h1 className="mt-5 text-2xl font-extrabold uppercase">Carrito vacío</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Un solo carrito para las dos secciones: sumá un cuchillo o una sartén y aparece todo
            junto acá.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PolygonButton to="/knifes">Explorar Knifes</PolygonButton>
            <PolygonButton to="/kitchen" variant="beige">Explorar Kitchen</PolygonButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Carrito combinado"
        title="Tu selección"
        subtitle={`${count} artículo${count !== 1 ? 's' : ''} · Knifes: ${knifesCount} · Kitchen: ${kitchenCount} · pago contra entrega`}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          {lines.map((line, i) => (
            <Reveal key={line.product.slug} delay={i * 0.05}>
              <div className="glass clip-card premium-shadow flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <Link
                  to={`/producto/${line.product.slug}`}
                  className="flex h-24 w-full shrink-0 items-center justify-center bg-[var(--surface-2)] p-2 sm:w-32"
                >
                  <KnifeArt kind={line.product.art} tone={line.product.tone} />
                </Link>

                <div className="min-w-0 flex-1">
                  <span
                    className={`clip-tag inline-block px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.18em] ${
                      line.product.category === 'knifes' ? 'chip-knifes' : 'chip-kitchen'
                    }`}
                  >
                    {line.product.category === 'knifes' ? 'Knifes' : 'Kitchen'}
                  </span>
                  <h3 className="mt-2 truncate text-base font-extrabold uppercase">
                    <Link to={`/producto/${line.product.slug}`} className="hover:text-[var(--accent)]">
                      {line.product.name}
                    </Link>
                  </h3>
                  <p className="font-mono-nums mt-1 text-sm font-bold">
                    ${(line.product.price * line.qty).toLocaleString('es-AR')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Restar"
                    onClick={() => setQty(line.product.slug, line.qty - 1)}
                    className="btn-knife glass flex h-9 w-9 items-center justify-center hover:text-[var(--accent)]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-extrabold">{line.qty}</span>
                  <button
                    type="button"
                    aria-label="Sumar"
                    onClick={() => setQty(line.product.slug, line.qty + 1)}
                    className="btn-knife glass flex h-9 w-9 items-center justify-center hover:text-[var(--accent)]"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Quitar"
                    onClick={() => remove(line.product.slug)}
                    className="btn-knife glass ml-2 flex h-9 w-9 items-center justify-center text-[var(--danger)] hover:border-[var(--danger)]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}

          <button
            type="button"
            onClick={clear}
            className="self-start text-xs font-bold uppercase tracking-wider text-[var(--muted)] transition-colors hover:text-[var(--danger)]"
          >
            Vaciar carrito
          </button>
        </div>

        <Reveal delay={0.15}>
          <aside className="glass clip-hero premium-shadow sticky top-24 p-6">
            <h2 className="border-b border-[var(--line)] pb-3 text-xs font-extrabold uppercase tracking-[0.2em]">
              Resumen
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {knifesCount > 0 && (
                <span className="clip-tag chip-knifes px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em]">
                  Knifes · {knifesCount}
                </span>
              )}
              {kitchenCount > 0 && (
                <span className="clip-tag chip-kitchen px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em]">
                  Kitchen · {kitchenCount}
                </span>
              )}
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Subtotal</span>
                <span className="font-mono-nums">${total.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-[var(--muted)]">
                <span>Envío</span>
                <span>A coordinar</span>
              </div>
              <div className="font-mono-nums flex justify-between border-t border-[var(--line)] pt-3 text-lg font-extrabold">
                <span>Total</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <PolygonButton to="/checkout" className="w-full">
                Ir al checkout <ArrowRight size={16} />
              </PolygonButton>
              <PolygonButton to="/" variant="ghost" className="w-full">
                Elegir sección
              </PolygonButton>
            </div>

            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[var(--muted)]">
              <Bike size={14} className="mt-0.5 shrink-0" />
              Todo contra entrega: confirmás el pedido por Formspree y pagás en efectivo al recibir.
            </p>
          </aside>
        </Reveal>
      </div>
    </div>
  )
}
