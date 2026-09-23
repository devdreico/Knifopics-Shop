import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Zap, Bike } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import PolygonButton from '../components/ui/PolygonButton'
import Reveal from '../components/ui/Reveal'
import { useCart } from '../context/CartContext'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

export default function Checkout() {
  const { lines, total, count, clear } = useCart()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [mode, setMode] = useState<'cod' | 'mp'>('cod')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (lines.length === 0) return

    const form = e.currentTarget
    const fd = new FormData(form)

    const orderLines = lines
      .map((l) => `${l.qty}× ${l.product.name} ($${(l.product.price * l.qty).toLocaleString('es-AR')})`)
      .join('\n')

    const payload = {
      _subject: 'Pedido contra entrega — Knifopics Shop',
      nombre: String(fd.get('nombre') ?? ''),
      telefono: String(fd.get('telefono') ?? ''),
      email: String(fd.get('email') ?? ''),
      ciudad: String(fd.get('ciudad') ?? ''),
      direccion: String(fd.get('direccion') ?? ''),
      notas: String(fd.get('notas') ?? ''),
      productos: orderLines,
      total_ars: String(total),
    }

    if (!FORMSPREE_ID) {
      console.info('[Checkout] Formspree ID no configurado — demo local', payload)
      setStatus('ok')
      clear()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Formspree error')
      setStatus('ok')
      clear()
    } catch {
      setStatus('error')
    }
  }

  if (lines.length === 0 && status !== 'ok') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">No hay artículos</h1>
        <p className="mt-3 text-[var(--muted)]">Agrega productos antes de pasar por checkout.</p>
        <div className="mt-8 flex justify-center">
          <PolygonButton to="/knifes">Ir a la tienda</PolygonButton>
        </div>
      </div>
    )
  }

  if (status === 'ok') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass clip-hero premium-shadow p-10"
        >
          <CheckCircle2 size={48} className="mx-auto text-[var(--accent)]" />
          <h1 className="mt-5 text-3xl font-extrabold uppercase">Pedido recibido</h1>
          <p className="mt-3 text-[var(--muted)]">
            Gracias. Te contactaremos para coordinar la entrega contra pago.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PolygonButton to="/knifes">Seguir explorando</PolygonButton>
            <PolygonButton to="/wiki" variant="ghost">Ir a la wiki</PolygonButton>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Checkout"
        title="Finalizar pedido"
        subtitle={`${count} artículo${count !== 1 ? 's' : ''} · total $${total.toLocaleString('es-AR')}`}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <Reveal>
          <div className="glass clip-hero premium-shadow p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode('cod')}
                className={`btn-knife inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  mode === 'cod'
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'glass text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                <Bike size={15} /> Contra entrega
              </button>
              <button
                type="button"
                onClick={() => setMode('mp')}
                className={`btn-knife inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  mode === 'mp'
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'glass text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                <Zap size={15} /> MercadoPago
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'cod' ? (
                <motion.form
                  key="cod"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={onSubmit}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Nombre *
                    <input name="nombre" required placeholder="Tu nombre" autoComplete="name" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Teléfono *
                    <input name="telefono" required placeholder="+54 11 0000-0000" autoComplete="tel" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Email *
                    <input name="email" type="email" required placeholder="vos@email.com" autoComplete="email" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Ciudad *
                    <input name="ciudad" required placeholder="Buenos Aires" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)] sm:col-span-2">
                    Dirección *
                    <input name="direccion" required placeholder="Calle, número, piso, depto" autoComplete="street-address" />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--muted)] sm:col-span-2">
                    Notas
                    <textarea name="notas" rows={3} placeholder="Referencias, horarios…" />
                  </label>

                  <div className="sm:col-span-2">
                    {status === 'error' && (
                      <p className="mb-3 text-sm font-semibold text-[var(--danger)]">
                        No pudimos enviar el pedido. Revisá tu conexión o escribinos por WhatsApp.
                      </p>
                    )}
                    <PolygonButton type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Enviando…
                        </>
                      ) : (
                        <>Confirmar pedido contra entrega</>
                      )}
                    </PolygonButton>
                    {!FORMSPREE_ID && (
                      <p className="mt-3 text-[11px] text-[var(--muted)]">
                        Demo: configurá <code>VITE_FORMSPREE_ID</code> en .env para envío real.
                      </p>
                    )}
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="mp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col gap-4"
                >
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    Cada producto tiene su <strong className="text-[var(--ink)]">link único de
                    MercadoPago</strong>. Para pagar una unidad al instante, abrí la ficha del
                    producto y tocá «Pagar con MercadoPago».
                  </p>
                  <div className="flex flex-col gap-2">
                    {lines.map((l) => (
                      <div
                        key={l.product.slug}
                        className="glass clip-tag flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold uppercase">{l.product.name}</p>
                          <p className="text-xs text-[var(--muted)]">
                            {l.qty}× ${l.product.price.toLocaleString('es-AR')}
                          </p>
                        </div>
                        <a
                          href={l.product.mpLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-knife shrink-0 bg-[var(--accent)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent-ink)] transition hover:brightness-110"
                        >
                          Pagar
                        </a>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-[var(--muted)]">
                    Reemplazá los placeholders en <code>src/data/products.ts</code> con tus links
                    reales de MercadoPago.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="glass clip-hero premium-shadow sticky top-24 p-6">
            <h2 className="border-b border-[var(--line)] pb-3 text-xs font-extrabold uppercase tracking-[0.2em]">
              Tu pedido
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {lines.map((l) => (
                <li key={l.product.slug} className="flex justify-between gap-3">
                  <span className="text-[var(--muted)]">
                    {l.qty}× {l.product.name}
                  </span>
                  <span className="font-semibold shrink-0">
                    ${(l.product.price * l.qty).toLocaleString('es-AR')}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-[var(--line)] pt-4 flex justify-between text-lg font-extrabold font-mono-nums">
              <span>Total</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  )
}
