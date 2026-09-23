import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/knifes', label: 'Knifes' },
  { to: '/cocina', label: 'Cocina' },
  { to: '/wiki', label: 'Wiki' },
  { to: '/academia', label: 'Academia' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count, bump } = useCart()

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Knifopics inicio">
            <img
              src="/knifopics-logo.png"
              alt="Knifopics"
              className="h-9 w-auto object-contain"
              width={120}
              height={36}
            />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Principal">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `clip-tag relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-150 ${
                    isActive ? 'text-[var(--ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 bottom-0 h-[2px] bg-[var(--ink)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/carrito"
              className="btn-knife relative flex h-10 items-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-4 pr-7 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink)] transition-all hover:border-[var(--ink)]"
              aria-label={`Carrito, ${count} artículos`}
            >
              <motion.span key={bump} animate={bump ? { scale: [1, 1.2, 1] } : undefined}>
                <ShoppingBag size={15} strokeWidth={2.2} />
              </motion.span>
              <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="font-mono-nums absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center bg-[var(--ink)] px-1 text-[10px] font-extrabold text-[var(--accent-ink)]">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="btn-knife flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--surface)] md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong overflow-hidden border-b border-[var(--line)] md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Móvil">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `btn-knife px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] ${
                      isActive
                        ? 'bg-[var(--ink)] text-[var(--accent-ink)]'
                        : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
