import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, ChefHat, Flame } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import KnifeArt from '../components/ui/KnifeArt'
import { useSection } from '../hooks/useSection'
import { knifeGuides, kitchenGuides } from '../data/guides'

export default function Guides() {
  const section = useSection()
  const isKnifes = section === 'knifes'
  const guides = isKnifes ? knifeGuides : kitchenGuides
  const base = isKnifes ? '/knifes/guias' : '/kitchen/guias'

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionTitle
        eyebrow={isKnifes ? 'Knifes · Guías interactivas' : 'Kitchen · Guías'}
        title={isKnifes ? 'Pasos por cuchillo' : 'Guías de cocina'}
        subtitle={
          isKnifes
            ? 'Cada tipo de hoja con su guía completa: empuñadura, técnica, filo y errores que se pagan caros. Navegá paso a paso, en modo app.'
            : 'De la cura del hierro al wok humeante: métodos de cocina explicados paso a paso, con trucos de profesional.'
        }
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g, i) => (
          <Reveal key={g.slug} delay={i * 0.06}>
            <Link
              to={`${base}/${g.slug}`}
              className="glass premium-shadow premium-shadow-hover clip-hero edge-highlight group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1.5"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[var(--surface-2)]">
                <div className="absolute inset-0 grid-lines opacity-50" />
                {g.art ? (
                  <motion.div
                    className="relative z-10 w-full max-w-[260px] px-6"
                    whileHover={{ scale: 1.08, rotate: -3 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  >
                    <KnifeArt kind={g.art} tone={isKnifes ? 'blade' : 'copper'} />
                  </motion.div>
                ) : (
                  <span className="relative z-10 text-[var(--muted)]">
                    {isKnifes ? <Flame size={44} strokeWidth={1.4} /> : <ChefHat size={44} strokeWidth={1.4} />}
                  </span>
                )}
                <span className="clip-tag absolute left-4 top-4 z-10 bg-[var(--ink)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">
                  {g.level}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} /> {g.minutes} min
                  </span>
                  <span className="font-mono-nums">{g.steps.length} pasos</span>
                </div>
                <h3 className="mt-3 text-xl leading-tight font-extrabold uppercase">{g.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                  {g.excerpt}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                  Empezar guía
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
