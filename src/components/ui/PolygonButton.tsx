import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'

type Variant = 'primary' | 'ghost' | 'outline' | 'beige'

const styles: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-[var(--accent-ink)] font-bold hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)] active:brightness-95',
  ghost: 'glass text-[var(--ink)] font-semibold hover:border-[var(--line-strong)] hover:bg-[var(--glass-strong)]',
  outline:
    'bg-transparent border border-[var(--line-strong)] text-[var(--ink)] font-semibold hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--accent-ink)]',
  /* Scarce beige — use only on secondary CTAs when specified */
  beige:
    'bg-[var(--beige-soft)] text-[var(--ink)] font-semibold border border-[var(--beige)] hover:bg-[var(--beige)]',
}

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: (e?: MouseEvent<HTMLElement>) => void
  ariaLabel?: string
}

export default function PolygonButton({
  children,
  variant = 'primary',
  className = '',
  to,
  type = 'button',
  disabled,
  onClick,
  ariaLabel,
}: Props) {
  const cls = `btn-knife inline-flex items-center justify-center gap-2 px-7 py-3.5 pr-9 text-sm uppercase tracking-[0.08em] ${styles[variant]} ${className}`

  if (to !== undefined) {
    return (
      <motion.span whileTap={{ scale: 0.98 }} className="inline-flex">
        <Link to={to} className={cls} aria-label={ariaLabel}>
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cls}
    >
      {children}
    </motion.button>
  )
}
