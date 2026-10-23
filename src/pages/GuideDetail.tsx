import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Lightbulb, RotateCcw, ShoppingBag } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import PolygonButton from '../components/ui/PolygonButton'
import KnifeArt from '../components/ui/KnifeArt'
import { getGuide } from '../data/guides'

export default function GuideDetail() {
  const { slug } = useParams()
  const found = slug ? getGuide(slug) : undefined
  const [idx, setIdx] = useState(0)
  const [done, setDone] = useState(false)

  const total = found?.guide.steps.length ?? 0

  const next = useCallback(() => {
    if (!total) return
    setIdx((i) => {
      if (i + 1 >= total) {
        setDone(true)
        return i
      }
      return i + 1
    })
  }, [total])

  const prev = useCallback(() => {
    setDone(false)
    setIdx((i) => Math.max(0, i - 1))
  }, [])

  useEffect(() => {
    setIdx(0)
    setDone(false)
  }, [slug])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (!found) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">Guía no encontrada</h1>
        <div className="mt-8 flex justify-center">
          <PolygonButton to="/knifes/guias">Ver todas las guías</PolygonButton>
        </div>
      </div>
    )
  }

  const { guide, section } = found
  const hub = section === 'knifes' ? '/knifes/guias' : '/kitchen/guias'
  const shop = section === 'knifes' ? '/knifes' : '/kitchen'
  const step = guide.steps[idx]
  const progress = (done ? total : idx) / total * 100

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Reveal>
        <Link
          to={hub}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> {section === 'knifes' ? 'Pasos por cuchillo' : 'Guías de cocina'}
        </Link>
      </Reveal>

      {/* Header */}
      <div className="mt-6 flex flex-col gap-6 border-b border-[var(--line)] pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          {guide.art && (
            <div className="hidden h-28 w-40 shrink-0 items-center justify-center bg-[var(--surface-2)] p-3 sm:flex">
              <KnifeArt kind={guide.art} tone={section === 'knifes' ? 'blade' : 'copper'} />
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
              <span className="clip-tag bg-[var(--beige-soft)] px-2.5 py-1 text-[10px] font-extrabold text-[var(--ink)] ring-1 ring-[var(--beige)]">
                {guide.level}
              </span>
              <span>{guide.minutes} min</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-nums">{total} pasos</span>
            </div>
            <h1 className="mt-3 max-w-2xl text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
              {guide.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {guide.excerpt}
            </p>
          </div>
        </div>
        <span className="hidden shrink-0 self-start text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:block">
          ← → para navegar
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Stepper */}
        <div className="glass clip-hero premium-shadow edge-highlight relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-30" />

          {/* Progress */}
          <div className="relative z-10 px-6 pt-6 sm:px-8">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">
              <span>Progreso</span>
              <span className="font-mono-nums">
                {done ? total : idx + 1} / {total}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-[var(--surface-2)]">
              <motion.div
                className="h-full bg-[var(--accent)]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 260, damping: 32 }}
              />
            </div>
          </div>

          {/* Step dots */}
          <div className="relative z-10 mt-5 flex flex-wrap gap-2 px-6 sm:px-8">
            {guide.steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => {
                  setDone(false)
                  setIdx(i)
                }}
                aria-label={`Ir al paso ${i + 1}`}
                aria-current={i === idx && !done ? 'step' : undefined}
                className={`h-7 w-7 text-[11px] font-extrabold transition-all ${
                  i === idx && !done
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : i < idx || done
                      ? 'bg-[var(--ink)] text-white'
                      : 'bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 min-h-[290px] px-6 py-7 sm:px-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col items-start justify-center py-6"
                >
                  <span className="clip-tag inline-flex items-center gap-2 bg-[var(--accent)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent-ink)]">
                    <Check size={13} /> Guía completada
                  </span>
                  <h2 className="mt-5 text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
                    {guide.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                    Los {total} pasos quedaron en la memoria. Repitala cuando quieras — y si te
                    falta el equipo, la tienda de la sección está a un click.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <PolygonButton to={shop}>
                      <ShoppingBag size={15} /> Ir a la tienda
                    </PolygonButton>
                    <PolygonButton
                      variant="ghost"
                      onClick={() => {
                        setDone(false)
                        setIdx(0)
                      }}
                    >
                      <RotateCcw size={15} /> Repetir guía
                    </PolygonButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[var(--accent)]">
                    Paso {idx + 1}
                  </span>
                  <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    {step.body}
                  </p>
                  {step.tip && (
                    <p className="mt-5 flex max-w-2xl items-start gap-2.5 border-l-2 border-[var(--beige)] bg-[var(--beige-soft)]/60 p-3 text-sm text-[var(--ink)]">
                      <Lightbulb size={15} className="mt-0.5 shrink-0" />
                      {step.tip}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nav */}
          {!done && (
            <div className="relative z-10 flex items-center justify-between gap-3 border-t border-[var(--line)] px-6 py-5 sm:px-8">
              <button
                type="button"
                onClick={prev}
                disabled={idx === 0}
                className="btn-knife glass inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Anterior
              </button>
              <button
                type="button"
                onClick={next}
                className="btn-knife inline-flex items-center gap-2 bg-[var(--accent)] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-[var(--accent-ink)] transition hover:brightness-110"
              >
                {idx + 1 === total ? (
                  <>
                    Finalizar <Check size={14} />
                  </>
                ) : (
                  <>
                    Siguiente <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Índice lateral */}
        <Reveal delay={0.12}>
          <aside className="glass clip-card sticky top-24 p-5">
            <h2 className="border-b border-[var(--line)] pb-3 text-[10px] font-extrabold uppercase tracking-[0.2em]">
              Índice de pasos
            </h2>
            <ol className="mt-4 space-y-1">
              {guide.steps.map((s, i) => {
                const state = done || i < idx ? 'done' : i === idx ? 'current' : 'todo'
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => {
                        setDone(false)
                        setIdx(i)
                      }}
                      className={`flex w-full items-start gap-3 px-2 py-2 text-left text-sm transition-colors ${
                        state === 'current'
                          ? 'bg-[var(--surface-2)] font-bold text-[var(--ink)]'
                          : 'text-[var(--muted)] hover:text-[var(--ink)]'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[10px] font-extrabold ${
                          state === 'todo'
                            ? 'bg-[var(--surface-2)] text-[var(--muted)]'
                            : 'bg-[var(--accent)] text-[var(--accent-ink)]'
                        }`}
                      >
                        {state === 'done' ? <Check size={11} /> : i + 1}
                      </span>
                      <span className="leading-snug">{s.title}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </aside>
        </Reveal>
      </div>
    </div>
  )
}
