import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

const styles: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-[var(--accent-ink)] font-bold hover:brightness-110 active:brightness-95',
  ghost: 'glass text-[var(--ink)] hover:bg-[var(--glass-strong)] font-semibold',
  outline:
    'bg-transparent border border-[var(--line)] text-[var(--ink)] font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)]',
}

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: (e?: MouseEvent<HTMLElement>) => void
}

export default function PolygonButton({
  children,
  variant = 'primary',
  className = '',
  to,
  type = 'button',
  disabled,
  onClick,
}: Props) {
  const cls = `clip-btn inline-flex items-center justify-center gap-2 px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]} ${className}`

  if (to !== undefined) {
    return (
      <motion.span whileTap={{ scale: 0.97 }} className="inline-flex">
        <Link to={to} className={cls}>
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cls}
    >
      {children}
    </motion.button>
  )
}
