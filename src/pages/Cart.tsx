import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import PolygonButton from '../components/ui/PolygonButton'
import Reveal from '../components/ui/Reveal'
import KnifeArt from '../components/ui/KnifeArt'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { lines, total, setQty, remove, count, clear } = useCart()

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="glass clip-hero premium-shadow mx-auto flex max-w-md flex-col items-center p-10">
          <ShoppingBag size={40} className="text-[var(--accent)]" />
          <h1 className="mt-5 text-2xl font-extrabold uppercase">Carrito vacío</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Añade un cuchillo o un objeto de cocina para continuar.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PolygonButton to="/knifes">Explorar Knifes</PolygonButton>
            <PolygonButton to="/cocina" variant="ghost">Cocina</PolygonButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Tu selección"
        title="Carrito"
        subtitle={`${count} artículo${count !== 1 ? 's' : ''} · pago contra entrega vía Formspree o link MercadoPago por producto`}
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
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--steel)]">
                    {line.product.category === 'knifes' ? 'Knifes' : 'Cocina'}
                  </p>
                  <h3 className="truncate text-base font-extrabold uppercase">
                    <Link to={`/producto/${line.product.slug}`} className="hover:text-[var(--accent)]">
                      {line.product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-bold text-[var(--accent)]">
                    ${(line.product.price * line.qty).toLocaleString('es-AR')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Restar"
                    onClick={() => setQty(line.product.slug, line.qty - 1)}
                    className="clip-btn glass flex h-9 w-9 items-center justify-center hover:text-[var(--accent)]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-extrabold">{line.qty}</span>
                  <button
                    type="button"
                    aria-label="Sumar"
                    onClick={() => setQty(line.product.slug, line.qty + 1)}
                    className="clip-btn glass flex h-9 w-9 items-center justify-center hover:text-[var(--accent)]"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Quitar"
                    onClick={() => remove(line.product.slug)}
                    className="clip-btn glass ml-2 flex h-9 w-9 items-center justify-center text-[var(--danger)] hover:border-[var(--danger)]"
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
            <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
              Resumen
            </h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Subtotal</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-[var(--muted)]">
                <span>Envío</span>
                <span>A coordinar</span>
              </div>
              <div className="border-t border-[var(--line)] pt-3 flex justify-between text-lg font-extrabold">
                <span>Total</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <PolygonButton to="/checkout" className="w-full">
                Ir al checkout <ArrowRight size={16} />
              </PolygonButton>
              <PolygonButton to="/knifes" variant="ghost" className="w-full">
                Seguir comprando
              </PolygonButton>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-[var(--muted)]">
              Contra entrega: enviamos tu pedido por Formspree. ¿Solo un producto? Pagá al instante
              con el link MercadoPago de su ficha.
            </p>
          </aside>
        </Reveal>
      </div>
    </div>
  )
}
