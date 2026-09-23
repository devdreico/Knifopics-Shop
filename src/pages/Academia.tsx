import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Timer,
  Sparkles,
  Calculator,
  Layers,
  RotateCcw,
  Check,
  X,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import PolygonButton from '../components/ui/PolygonButton'
import {
  quizQuestions,
  flashcards,
  sharpeningSessions,
  calculateSharpening,
} from '../data/academy'

type ModuleId = 'guia' | 'quiz' | 'calc' | 'cards'

const modules: { id: ModuleId; label: string; icon: typeof Timer; desc: string }[] = [
  { id: 'guia', label: 'Guía de afilado', icon: Timer, desc: 'Sesión paso a paso con cronómetro' },
  { id: 'quiz', label: 'Quiz identificador', icon: Sparkles, desc: '8 preguntas de cultura filo' },
  { id: 'calc', label: 'Calculadora', icon: Calculator, desc: 'Ángulo y grano según acero' },
  { id: 'cards', label: 'Flashcards', icon: Layers, desc: 'Memorización tipo repetición' },
]

/* ————— GUÍA ————— */
function GuideModule() {
  const [sessionId, setSessionId] = useState(sharpeningSessions[0].id)
  const session = sharpeningSessions.find((s) => s.id === sessionId)!
  const [stepIdx, setStepIdx] = useState(0)
  const [running, setRunning] = useState(false)
  const [left, setLeft] = useState(session.steps[0].seconds)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const step = session.steps[stepIdx]

  function loadSession(id: string) {
    const s = sharpeningSessions.find((x) => x.id === id)!
    setSessionId(id)
    setStepIdx(0)
    setLeft(s.steps[0].seconds)
    setRunning(false)
    setDone(false)
  }

  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(i, session.steps.length - 1))
    setStepIdx(clamped)
    setLeft(session.steps[clamped].seconds)
    setRunning(false)
    setDone(false)
  }

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          setRunning(false)
          if (stepIdx < session.steps.length - 1) {
            const next = stepIdx + 1
            setStepIdx(next)
            return session.steps[next].seconds
          }
          setDone(true)
          return 0
        }
        return v - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running, stepIdx, session])

  const progress = ((stepIdx + (done ? 1 : 0)) / session.steps.length) * 100
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {sharpeningSessions.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => loadSession(s.id)}
            className={`clip-btn px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              s.id === sessionId
                ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                : 'glass text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            {s.knife}
          </button>
        ))}
      </div>

      <div className="glass clip-hero premium-shadow p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              {session.angle} · {session.gritNote}
            </p>
            <h3 className="mt-1 text-xl font-extrabold uppercase">
              Paso {stepIdx + 1}/{session.steps.length}: {step.title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="clip-tag glass px-4 py-2 font-mono text-2xl font-extrabold tabular-nums">
              {mm}:{ss}
            </div>
            <button
              type="button"
              onClick={() => setRunning((v) => !v)}
              className="clip-btn flex h-11 w-11 items-center justify-center bg-[var(--accent)] text-[var(--accent-ink)]"
              aria-label={running ? 'Pausar' : 'Play'}
            >
              {running ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
        </div>

        <div className="mt-5 h-1.5 w-full bg-[var(--surface-2)]">
          <motion.div
            className="h-full bg-[var(--accent)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={`${sessionId}-${stepIdx}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="mt-5 text-sm leading-relaxed text-[var(--muted)]"
          >
            {step.body}
          </motion.p>
        </AnimatePresence>

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex items-center gap-2 text-sm font-bold text-[var(--accent)]"
          >
            <Check size={16} /> Sesión completa — probá el cuchillo en papel.
          </motion.div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(stepIdx - 1)}
            disabled={stepIdx === 0}
            className="clip-btn glass inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Anterior
          </button>
          <button
            type="button"
            onClick={() => {
              setLeft(step.seconds)
              setRunning(false)
              setDone(false)
            }}
            className="clip-btn glass inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            type="button"
            onClick={() => goTo(stepIdx + 1)}
            disabled={stepIdx >= session.steps.length - 1}
            className="clip-btn glass inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase disabled:opacity-40"
          >
            Siguiente <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ————— QUIZ ————— */
function QuizModule() {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = quizQuestions[idx]

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.correct) setScore((s) => s + 1)
  }

  function next() {
    if (idx >= quizQuestions.length - 1) {
      setFinished(true)
      return
    }
    setIdx((i) => i + 1)
    setPicked(null)
  }

  function restart() {
    setIdx(0)
    setPicked(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100)
    return (
      <div className="glass clip-hero premium-shadow p-8 text-center">
        <Sparkles size={40} className="mx-auto text-[var(--accent)]" />
        <h3 className="mt-4 text-3xl font-extrabold uppercase">
          {score}/{quizQuestions.length}
        </h3>
        <p className="mt-2 text-[var(--muted)]">
          {pct >= 80
            ? 'Ojo de cuchillero — dominás la teoría.'
            : pct >= 50
              ? 'Buen nivel. Repasá las flashcards para afilarlo.'
              : 'Todavía hay filo que ganar. Probá el quiz de nuevo.'}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <PolygonButton onClick={restart}>
            <RotateCcw size={15} /> Repetir quiz
          </PolygonButton>
        </div>
      </div>
    )
  }

  return (
    <div className="glass clip-hero premium-shadow p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>
          Pregunta {idx + 1} / {quizQuestions.length}
        </span>
        <span className="text-[var(--accent)]">Puntaje {score}</span>
      </div>
      <div className="mt-3 h-1.5 w-full bg-[var(--surface-2)]">
        <motion.div
          className="h-full bg-[var(--accent)]"
          animate={{ width: `${((idx + (picked !== null ? 1 : 0)) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h3 className="mt-6 text-xl font-extrabold uppercase leading-snug">{q.prompt}</h3>

          <div className="mt-5 grid gap-2.5">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct
              const show = picked !== null
              let cls = 'glass text-[var(--ink)] hover:border-[var(--accent)]'
              if (show && isCorrect) cls = 'bg-[color-mix(in_srgb,var(--accent)_30%,transparent)] border border-[var(--accent)] text-[var(--ink)]'
              if (show && i === picked && !isCorrect) cls = 'bg-[color-mix(in_srgb,var(--danger)_25%,transparent)] border border-[var(--danger)]'
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pick(i)}
                  disabled={show}
                  className={`clip-btn flex items-center justify-between gap-3 px-5 py-3.5 text-left text-sm font-semibold transition ${cls}`}
                >
                  <span>{opt}</span>
                  {show && isCorrect && <Check size={16} className="text-[var(--accent)]" />}
                  {show && i === picked && !isCorrect && <X size={16} className="text-[var(--danger)]" />}
                </button>
              )
            })}
          </div>

          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm leading-relaxed text-[var(--muted)]">{q.explain}</p>
              <PolygonButton onClick={next} className="shrink-0">
                {idx >= quizQuestions.length - 1 ? 'Ver resultado' : 'Siguiente'}
              </PolygonButton>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ————— CALCULADORA ————— */
function CalcModule() {
  const [steel, setSteel] = useState<'inox-carbon' | 'inox-alto' | 'damascus-vg' | 'carbono-blanco' | 'duralumin'>('damascus-vg')
  const [usage, setUsage] = useState<'hogar' | 'pro' | 'hueso'>('hogar')
  const [width, setWidth] = useState(1.8)

  const result = useMemo(() => calculateSharpening({ steel, usage, width }), [steel, usage, width])

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="glass clip-card premium-shadow p-6">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
          Parámetros
        </h3>

        <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Tipo de acero
          <select
            value={steel}
            onChange={(e) => setSteel(e.target.value as typeof steel)}
            className="mt-1.5 w-full text-sm font-semibold"
          >
            <option value="inox-carbon">Inoxidable estándar (X50, 440)</option>
            <option value="inox-alto">Inox alto rendimiento (14C28N, AUS-10)</option>
            <option value="damascus-vg">Damascus / VG-10</option>
            <option value="carbono-blanco">Carbono japonés (Shirogami)</option>
            <option value="duralumin">Utilitario / aleación blanda</option>
          </select>
        </label>

        <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Uso
          <select
            value={usage}
            onChange={(e) => setUsage(e.target.value as typeof usage)}
            className="mt-1.5 w-full text-sm font-semibold"
          >
            <option value="hogar">Hogar / versátil</option>
            <option value="pro">Servicio profesional</option>
            <option value="hueso">Golpe / hueso pequeño</option>
          </select>
        </label>

        <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Espesor de hoja: <span className="text-[var(--accent)]">{width.toFixed(1)} mm</span>
          <input
            type="range"
            min={0.6}
            max={3.5}
            step={0.1}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--accent)]"
            style={{ clipPath: 'none', border: 'none', padding: 0, background: 'transparent' }}
          />
        </label>
      </div>

      <motion.div
        key={`${result.anglePerSide}-${result.gritEnd}`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass clip-hero premium-shadow flex flex-col p-6"
      >
        <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
          Resultado
        </h3>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="glass clip-tag p-4 text-center">
            <div className="text-3xl font-extrabold text-[var(--accent)]">{result.anglePerSide}°</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
              por lado
            </div>
          </div>
          <div className="glass clip-tag p-4 text-center">
            <div className="text-3xl font-extrabold text-[var(--accent)]">{result.inclusive}°</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
              incluido
            </div>
          </div>
        </div>

        <div className="mt-4 glass clip-tag p-4 text-center">
          <div className="text-2xl font-extrabold">
            {result.gritStart} → {result.gritEnd}
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
            grano recomendado
          </div>
        </div>

        <ul className="mt-5 flex flex-col gap-2.5">
          {result.notes.map((n) => (
            <li key={n} className="flex gap-2 text-sm text-[var(--muted)]">
              <Check size={15} className="mt-0.5 shrink-0 text-[var(--accent)]" />
              {n}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

/* ————— FLASHCARDS ————— */
function CardsModule() {
  const decks = useMemo(() => Array.from(new Set(flashcards.map((f) => f.deck))), [])
  const [deck, setDeck] = useState<string | 'all'>('all')
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const list = useMemo(
    () => (deck === 'all' ? flashcards : flashcards.filter((f) => f.deck === deck)),
    [deck],
  )
  const card = list[Math.min(i, list.length - 1)]

  function move(dir: 1 | -1) {
    setFlipped(false)
    setI((v) => {
      const n = v + dir
      if (n < 0) return list.length - 1
      if (n >= list.length) return 0
      return n
    })
  }

  if (list.length === 0) return null

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['all', ...decks] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setDeck(d)
              setI(0)
              setFlipped(false)
            }}
            className={`clip-btn px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              deck === d
                ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                : 'glass text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            {d === 'all' ? 'Todas' : d}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          className="relative w-full max-w-xl cursor-pointer text-left"
          aria-label="Girar tarjeta"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${card.id}-${flipped}`}
              initial={{ rotateY: flipped ? -8 : 8, opacity: 0, scale: 0.97 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28 }}
              className={`glass premium-shadow clip-hero edge-highlight flex min-h-[220px] flex-col items-center justify-center p-8 text-center ${
                flipped ? 'border-[var(--accent)]' : ''
              }`}
            >
              <span className="clip-tag bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                {flipped ? 'Respuesta' : `${card.deck} · ${i + 1}/${list.length}`}
              </span>
              <p className={`mt-6 font-extrabold uppercase leading-snug ${flipped ? 'text-base font-semibold normal-case text-[var(--muted)]' : 'text-2xl'}`}>
                {flipped ? card.back : card.front}
              </p>
              {!flipped && (
                <span className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Tocá para girar
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            className="clip-btn glass flex h-11 w-11 items-center justify-center hover:text-[var(--accent)]"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setFlipped((v) => !v)}
            className="clip-btn bg-[var(--accent)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)]"
          >
            Girar
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="clip-btn glass flex h-11 w-11 items-center justify-center hover:text-[var(--accent)]"
            aria-label="Siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ————— PAGE ————— */
export default function Academia() {
  const [params, setParams] = useSearchParams()
  const raw = (params.get('m') ?? 'guia') as ModuleId
  const active: ModuleId = modules.some((m) => m.id === raw) ? raw : 'guia'

  function switchModule(id: ModuleId) {
    setParams({ m: id })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Mini app"
        title="Academia del filo"
        subtitle="Cuatro módulos 100% del nicho cuchillo: guía con timer, quiz, calculadora de ángulos y flashcards."
      />

      <Reveal delay={0.1}>
        <div className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => {
            const Icon = m.icon
            const isActive = m.id === active
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => switchModule(m.id)}
                className={`clip-card border p-4 text-left transition-all hover:-translate-y-1 ${
                  isActive
                    ? 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_16%,var(--glass))]'
                    : 'border-[var(--line)] bg-[var(--glass)]'
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}
                />
                <div className={`mt-3 text-sm font-extrabold uppercase ${isActive ? 'text-[var(--ink)]' : ''}`}>
                  {m.label}
                </div>
                <div className="mt-1 text-[11px] text-[var(--muted)]">{m.desc}</div>
              </button>
            )
          })}
        </div>
      </Reveal>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {active === 'guia' && <GuideModule />}
            {active === 'quiz' && <QuizModule />}
            {active === 'calc' && <CalcModule />}
            {active === 'cards' && <CardsModule />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
