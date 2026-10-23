import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export type SectionActive = 'knifes' | 'kitchen' | null

const sides = [
  { key: 'knifes', label: 'Knifes', to: '/knifes' },
  { key: 'kitchen', label: 'Kitchen', to: '/kitchen' },
] as const

/**
 * Barra central 50/50 del header: elige entre las dos secciones del sitio.
 * `active` null (home) muestra los dos lados sin indicador.
 */
export default function SectionSwitcher({
  active,
  id,
}: {
  active: SectionActive
  id: string
}) {
  return (
    <div
      className="switcher h-10 w-[13.5rem] border border-[var(--line-strong)] bg-[var(--surface-2)] sm:w-60"
      role="group"
      aria-label="Elegir sección"
    >
      {active && (
        <motion.span
          key="ind"
          aria-hidden="true"
          className="switcher-indicator"
          style={{ background: 'var(--accent)' }}
          initial={false}
          animate={{ x: active === 'kitchen' ? '100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 460, damping: 38 }}
        />
      )}
      {sides.map((s) => {
        const isActive = active === s.key
        return (
          <Link
            key={s.key}
            to={s.to}
            id={isActive ? id : undefined}
            aria-current={isActive ? 'page' : undefined}
            className={`relative z-10 flex items-center justify-center text-[11px] font-extrabold uppercase tracking-[0.16em] transition-colors duration-150 ${
              isActive
                ? 'text-[var(--accent-ink)]'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            {s.label}
          </Link>
        )
      })}
    </div>
  )
}
