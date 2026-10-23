import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Banknote,
  Bike,
  Check,
  Loader2,
  Send,
  ShoppingBag,
} from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import PolygonButton from '../components/ui/PolygonButton'
import Reveal from '../components/ui/Reveal'
import { useCart } from '../context/CartContext'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

export default function Checkout() {
  const { lines, total, count, clear } = useCart()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const knifesCount = lines
    .filter((l) => l.product.category === 'knifes')
    .reduce((s, l) => s + l.qty, 0)
  const kitchenCount = lines
    .filter((l) => l.product.category === 'kitchen')
    .reduce((s, l) => s + l.qty, 0)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (lines.length === 0) return

    const form = e.currentTarget
    const fd = new FormData(form)

    const orderLines = lines
      .map(
        (l) =>
          `[${l.product.category === 'knifes' ? 'Knifes' : 'Kitchen'}] ${l.qty}× ${l.product.name} ($${(l.product.price * l.qty).toLocaleString('es-AR')})`,
      )
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
      secciones: `Knifes: ${knifesCount} · Kitchen: ${kitchenCount}`,
      total_ars: String(total),
      metodo_pago: 'Contra entrega (efectivo al recibir)',
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

  /* ——— Vacío ——— */
  if (lines.length === 0 && status !== 'ok') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="glass clip-hero premium-shadow mx-auto flex max-w-md flex-col items-center p-10">
          <ShoppingBag size={40} className="text-[var(--accent)]" />
          <h1 className="mt-5 text-3xl font-extrabold uppercase">No hay artículos</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Armá tu pedido combinado antes de pasar por checkout.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PolygonButton to="/knifes">Tienda Knifes</PolygonButton>
            <PolygonButton to="/kitchen" variant="beige">Tienda Kitchen</PolygonButton>
          </div>
        </div>
      </div>
    )
  }

  /* ——— Éxito ——— */
  if (status === 'ok') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          className="glass-strong premium-shadow clip-hero edge-highlight relative overflow-hidden p-10 text-left"
          style={{ backdropFilter: 'blur(40px) saturate(150%)' }}
        >
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div className="relative z-10">
            <span className="clip-tag inline-flex items-center gap-2 bg-[var(--accent)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent-ink)]">
              <Check size={13} /> Pedido enviado
            </span>
            <h1 className="mt-5 text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
              Recibimos tu pedido
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Viajó por Formspree con tu selección. Te contactamos para coordinar la entrega y
              pagás en efectivo cuando recibís.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PolygonButton to="/">
                Volver al inicio <ArrowRight size={15} />
              </PolygonButton>
              <PolygonButton to="/knifes" variant="ghost">
                Seguir explorando
              </PolygonButton>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  /* ——— Formulario ——— */
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Checkout · Contra entrega"
        title="Finalizar pedido"
        subtitle={`${count} artículo${count !== 1 ? 's' : ''} · total $${total.toLocaleString('es-AR')} · se despliega directo a Formspree`}
      />

      {/* Orbes de color detrás del glass */}
      <div className="pointer-events-none relative">
        <div
          aria-hidden="true"
          className="absolute -left-20 top-10 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--beige) 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-0 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(154,68,22,0.55) 0%, transparent 70%)' }}
        />

        <div className="relative mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ——— Formulario glass ——— */}
          <Reveal>
            <div
              className="glass-strong clip-hero edge-highlight premium-shadow relative overflow-hidden p-6 sm:p-9"
              style={{ backdropFilter: 'blur(44px) saturate(150%)' }}
            >
              <div className="absolute inset-0 grid-lines opacity-40" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 border-b border-[var(--line)] pb-5">
                  <span className="clip-tag inline-flex items-center gap-2 bg-[var(--accent)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent-ink)]">
                    <Bike size={13} /> Contra entrega
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                    <Banknote size={13} /> Pagás en efectivo al recibir
                  </span>
                  <span className="ml-auto hidden items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] sm:inline-flex">
                    <Send size={13} /> vía Formspree
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={onSubmit}
                    className="mt-6 grid gap-4 sm:grid-cols-2"
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
                      <textarea name="notas" rows={3} placeholder="Referencias, horarios, indicaciones de entrega…" />
                    </label>

                    <div className="sm:col-span-2">
                      {status === 'error' && (
                        <p className="mb-3 text-sm font-semibold text-[var(--danger)]">
                          No pudimos enviar el pedido. Revisá tu conexión o volvé a intentarlo.
                        </p>
                      )}
                      <PolygonButton type="submit" className="w-full sm:w-auto" disabled={status === 'sending'}>
                        {status === 'sending' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Enviando…
                          </>
                        ) : (
                          <>
                            <Send size={15} /> Confirmar pedido contra entrega
                          </>
                        )}
                      </PolygonButton>
                      {!FORMSPREE_ID && (
                        <p className="mt-3 text-[11px] text-[var(--muted)]">
                          Demo: configurá <code>VITE_FORMSPREE_ID</code> en .env para envío real.
                        </p>
                      )}
                    </div>
                  </motion.form>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* ——— Resumen que se despliega ——— */}
          <Reveal delay={0.12}>
            <aside
              className="glass-strong clip-hero edge-highlight premium-shadow sticky top-24 relative overflow-hidden p-6"
              style={{ backdropFilter: 'blur(44px) saturate(150%)' }}
            >
              <div className="absolute inset-0 grid-lines opacity-30" />
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em]">Tu pedido</h2>
                  <span className="font-mono-nums text-[11px] font-bold text-[var(--muted)]">
                    {count} ítems
                  </span>
                </div>

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

                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                  className="mt-5 space-y-3 text-sm"
                >
                  {lines.map((l) => (
                    <motion.li
                      key={l.product.slug}
                      variants={{
                        hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
                        show: { opacity: 1, y: 0, filter: 'blur(0px)' },
                      }}
                      className="flex items-start justify-between gap-3"
                    >
                      <span className="text-[var(--muted)]">
                        <span
                          className={`mr-1.5 inline-block h-2 w-2 align-middle ${
                            l.product.category === 'knifes' ? 'bg-[var(--ink)]' : 'bg-[#9a4416]'
                          }`}
                          aria-hidden="true"
                        />
                        {l.qty}× {l.product.name}
                      </span>
                      <span className="font-mono-nums shrink-0 font-semibold">
                        ${(l.product.price * l.qty).toLocaleString('es-AR')}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-5 space-y-2 border-t border-[var(--line)] pt-4 text-sm">
                  <div className="flex justify-between text-[var(--muted)]">
                    <span>Subtotal</span>
                    <span className="font-mono-nums">${total.toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between text-[var(--muted)]">
                    <span>Envío</span>
                    <span>A coordinar</span>
                  </div>
                  <div className="font-mono-nums flex justify-between border-t border-[var(--line)] pt-3 text-xl font-extrabold">
                    <span>Total</span>
                    <span>${total.toLocaleString('es-AR')}</span>
                  </div>
                </div>

                <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[var(--muted)]">
                  <Check size={13} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                  Sin pago online: el pedido llega por Formspree y coordinamos la entrega contra
                  efectivo.
                </p>

                <Link
                  to="/carrito"
                  className="btn-knife glass mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition hover:border-[var(--accent)]"
                >
                  Editar carrito
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
