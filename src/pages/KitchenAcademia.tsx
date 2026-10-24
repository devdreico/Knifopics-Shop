import { useEffect, useMemo, useReducer, useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { convertKitchen, getAcademia } from '../data/catalog'
import type { ConversionUnit } from '../data/types'
import Reveal from '../components/ui/Reveal'
import SectionTitle from '../components/ui/SectionTitle'

const units: ConversionUnit[] = ['ml', 'l', 'taza', 'cda', 'cdta', 'g', 'kg', 'oz', 'lb', '°C', '°F']

type TimerState = {
  sessionIndex: number
  stepIndex: number
  secondsLeft: number
  running: boolean
}

type TimerAction =
  | { type: 'select'; sessionIndex: number; seconds: number }
  | { type: 'step'; stepIndex: number; seconds: number }
  | { type: 'toggle' }
  | { type: 'reset'; seconds: number }
  | { type: 'tick'; stepCount: number; nextSeconds?: number }

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'select':
      return { sessionIndex: action.sessionIndex, stepIndex: 0, secondsLeft: action.seconds, running: false }
    case 'step':
      return { ...state, stepIndex: action.stepIndex, secondsLeft: action.seconds, running: false }
    case 'toggle':
      return { ...state, running: !state.running }
    case 'reset':
      return { ...state, secondsLeft: action.seconds, running: false }
    case 'tick':
      if (state.secondsLeft > 1) return { ...state, secondsLeft: state.secondsLeft - 1 }
      if (state.stepIndex + 1 < action.stepCount) {
        return {
          ...state,
          stepIndex: state.stepIndex + 1,
          secondsLeft: action.nextSeconds ?? 0,
        }
      }
      return { ...state, secondsLeft: 0, running: false }
  }
}

export default function KitchenAcademia() {
  const content = getAcademia('kitchen')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [timer, dispatchTimer] = useReducer(timerReducer, {
    sessionIndex: 0,
    stepIndex: 0,
    secondsLeft: content.sessions[0]?.steps[0]?.seconds ?? 0,
    running: false,
  })
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState<ConversionUnit>('taza')
  const [to, setTo] = useState<ConversionUnit>('ml')

  const question = content.quiz[questionIndex]
  const card = content.cards[cardIndex]
  const session = content.sessions[timer.sessionIndex]
  const step = session?.steps[timer.stepIndex]
  const conversion = useMemo(() => {
    const numericValue = Number(value)
    if (!value.trim() || !Number.isFinite(numericValue)) return null
    return convertKitchen(numericValue, from, to)
  }, [value, from, to])

  useEffect(() => {
    if (!timer.running || !step) return
    const intervalId = window.setInterval(() => {
      const nextStep = session.steps[timer.stepIndex + 1]
      dispatchTimer({
        type: 'tick',
        stepCount: session.steps.length,
        nextSeconds: nextStep?.seconds,
      })
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [timer.running, timer.sessionIndex, timer.stepIndex, session, step])

  function resetQuiz() {
    setQuestionIndex(0)
    setAnswer(null)
    setScore(0)
    setQuizDone(false)
  }

  function nextQuestion() {
    if (!question || questionIndex >= content.quiz.length - 1) {
      setQuizDone(true)
      return
    }
    setQuestionIndex((current) => current + 1)
    setAnswer(null)
  }

  function selectSession(index: number) {
    dispatchTimer({
      type: 'select',
      sessionIndex: index,
      seconds: content.sessions[index].steps[0]?.seconds ?? 0,
    })
  }

  function moveCard(direction: number) {
    setFlipped(false)
    setCardIndex((index) => (index + direction + content.cards.length) % content.cards.length)
  }

  const mm = String(Math.floor(timer.secondsLeft / 60)).padStart(2, '0')
  const ss = String(timer.secondsLeft % 60).padStart(2, '0')

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow="Kitchen · Mini app"
        title="Academia de cocina"
        subtitle="Practicá técnicas, poné a prueba tus conocimientos, repasá conceptos y convertí medidas."
      />

      <div className="mt-10 grid gap-8">
        <Reveal>
          <section className="glass clip-hero premium-shadow p-6 sm:p-8" aria-labelledby="timer-heading">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Sesión guiada
                </p>
                <h2 id="timer-heading" className="mt-2 text-xl font-extrabold uppercase">
                  Temporizador de práctica
                </h2>
              </div>
              {session && (
                <div className="flex flex-wrap gap-2">
                  {content.sessions.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectSession(index)}
                      aria-pressed={timer.sessionIndex === index}
                      className={`btn-knife px-3 py-2 text-xs font-bold uppercase ${
                        timer.sessionIndex === index
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                          : 'glass text-[var(--muted)]'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {session && step ? (
              <>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      {session.meta} · Paso {timer.stepIndex + 1}/{session.steps.length}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold uppercase">{step.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                      {step.body}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <output aria-label="Tiempo restante" className="font-mono text-3xl font-extrabold tabular-nums">
                      {mm}:{ss}
                    </output>
                    <button
                      type="button"
                      onClick={() => dispatchTimer({ type: 'toggle' })}
                      aria-label={timer.running ? 'Pausar temporizador' : 'Iniciar temporizador'}
                      className="btn-knife flex h-11 w-11 items-center justify-center bg-[var(--accent)] text-[var(--accent-ink)]"
                    >
                      {timer.running ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        dispatchTimer({ type: 'reset', seconds: step.seconds })
                      }}
                      aria-label="Reiniciar temporizador"
                      className="btn-knife glass flex h-11 w-11 items-center justify-center"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-5 flex justify-between">
                  <button
                    type="button"
                    disabled={timer.stepIndex === 0}
                    onClick={() => {
                      const previous = timer.stepIndex - 1
                      dispatchTimer({
                        type: 'step',
                        stepIndex: previous,
                        seconds: session.steps[previous].seconds,
                      })
                    }}
                    className="btn-knife glass inline-flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase disabled:opacity-40"
                  >
                    <ChevronLeft size={14} /> Anterior
                  </button>
                  <button
                    type="button"
                    disabled={timer.stepIndex >= session.steps.length - 1}
                    onClick={() => {
                      const next = timer.stepIndex + 1
                      dispatchTimer({
                        type: 'step',
                        stepIndex: next,
                        seconds: session.steps[next].seconds,
                      })
                    }}
                    className="btn-knife glass inline-flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase disabled:opacity-40"
                  >
                    Siguiente <ChevronRight size={14} />
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-5 text-sm text-[var(--muted)]">No hay sesiones disponibles todavía.</p>
            )}
          </section>
        </Reveal>

        <Reveal>
          <section className="glass clip-hero premium-shadow p-6 sm:p-8" aria-labelledby="quiz-heading">
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <Sparkles size={18} />
              <h2 id="quiz-heading" className="text-sm font-extrabold uppercase tracking-wider">
                Quiz de cocina
              </h2>
            </div>
            {content.quiz.length === 0 ? (
              <p className="mt-4 text-sm text-[var(--muted)]">Todavía no hay preguntas disponibles.</p>
            ) : quizDone ? (
              <div className="mt-5">
                <p className="text-2xl font-extrabold">{score}/{content.quiz.length} correctas</p>
                <button type="button" onClick={resetQuiz} className="btn-knife mt-4 bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase text-[var(--accent-ink)]">
                  Repetir quiz
                </button>
              </div>
            ) : question ? (
              <>
                <p className="mt-4 text-xs font-bold uppercase text-[var(--muted)]">
                  Pregunta {questionIndex + 1} de {content.quiz.length}
                </p>
                <h3 className="mt-2 text-lg font-extrabold">{question.prompt}</h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      disabled={answer !== null}
                      onClick={() => {
                        setAnswer(index)
                        if (index === question.correct) setScore((current) => current + 1)
                      }}
                      className={`btn-knife glass px-4 py-3 text-left text-sm font-semibold disabled:opacity-75 ${
                        answer !== null && index === question.correct
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]'
                          : answer === index
                            ? 'border-[var(--danger)]'
                            : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {answer !== null && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="flex items-start gap-2 text-sm text-[var(--muted)]">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      {question.explain}
                    </p>
                    <button type="button" onClick={nextQuestion} className="btn-knife bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase text-[var(--accent-ink)]">
                      {questionIndex === content.quiz.length - 1 ? 'Ver resultado' : 'Siguiente'}
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </section>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <section className="glass clip-hero premium-shadow h-full p-6" aria-labelledby="cards-heading">
              <h2 id="cards-heading" className="text-sm font-extrabold uppercase tracking-wider">Flashcards</h2>
              {card ? (
                <>
                  <button
                    type="button"
                    onClick={() => setFlipped((current) => !current)}
                    aria-label={flipped ? 'Mostrar frente de la tarjeta' : 'Mostrar respuesta'}
                    className="glass clip-card mt-4 flex min-h-40 w-full flex-col items-center justify-center p-6 text-center"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                      {flipped ? 'Respuesta' : `${card.deck} · ${cardIndex + 1}/${content.cards.length}`}
                    </span>
                    <span className="mt-3 text-xl font-extrabold">
                      {flipped ? card.back : card.front}
                    </span>
                    <span className="mt-3 text-[10px] uppercase text-[var(--muted)]">Tocá para girar</span>
                  </button>
                  <div className="mt-3 flex justify-between">
                    <button type="button" onClick={() => moveCard(-1)} className="btn-knife glass px-3 py-2 text-xs font-bold uppercase">Anterior</button>
                    <button type="button" onClick={() => moveCard(1)} className="btn-knife glass px-3 py-2 text-xs font-bold uppercase">Siguiente</button>
                  </div>
                </>
              ) : (
                <p className="mt-4 text-sm text-[var(--muted)]">Todavía no hay tarjetas disponibles.</p>
              )}
            </section>
          </Reveal>

          <Reveal>
            <section className="glass clip-hero premium-shadow h-full p-6" aria-labelledby="converter-heading">
              <h2 id="converter-heading" className="text-sm font-extrabold uppercase tracking-wider">Convertidor de medidas</h2>
              <label className="mt-4 block text-xs font-bold uppercase text-[var(--muted)]">
                Cantidad
                <input
                  type="number"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="mt-1.5 w-full"
                  step="any"
                />
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="text-xs font-bold uppercase text-[var(--muted)]">
                  De
                  <select value={from} onChange={(event) => setFrom(event.target.value as ConversionUnit)} className="mt-1.5 w-full">
                    {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                </label>
                <label className="text-xs font-bold uppercase text-[var(--muted)]">
                  A
                  <select value={to} onChange={(event) => setTo(event.target.value as ConversionUnit)} className="mt-1.5 w-full">
                    {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                </label>
              </div>
              <div className="mt-4 min-h-20 border-t border-[var(--line)] pt-4" aria-live="polite">
                {conversion ? (
                  <>
                    <p className="text-2xl font-extrabold text-[var(--accent)]">
                      {conversion.value} {conversion.unit}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{conversion.formula}</p>
                  </>
                ) : (
                  <p className="text-sm text-[var(--muted)]">
                    Elegí unidades compatibles: volumen con volumen, peso con peso o temperatura.
                  </p>
                )}
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
