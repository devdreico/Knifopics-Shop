import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Moon, Sun, ShoppingBag, X, Palette } from 'lucide-react'
import { useTheme, type Theme } from '../../context/ThemeContext'
import { useCart } from '../../context/CartContext'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/knifes', label: 'Knifes' },
  { to: '/cocina', label: 'Cocina' },
  { to: '/wiki', label: 'Wiki' },
  { to: '/academia', label: 'Academia' },
]

const themes: { id: Theme; icon: typeof Sun; label: string }[] = [
  { id: 'light', icon: Sun, label: 'Claro' },
  { id: 'beige', icon: Palette, label: 'Beige' },
  { id: 'dark', icon: Moon, label: 'Oscuro' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { count, bump } = useCart()

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong border-b border-[var(--line)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src="/knifopics-logo.png" alt="Knifopics" className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `clip-tag relative px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 bottom-0 h-0.5 bg-[var(--accent)]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              {themes.map((t) => {
                const Icon = t.icon
                const active = theme === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={`Tema ${t.label}`}
                    onClick={() => setTheme(t.id)}
                    className={`clip-btn flex h-9 w-9 items-center justify-center transition-all ${
                      active
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                        : 'glass text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <Icon size={15} />
                  </button>
                )
              })}
            </div>

            <Link
              to="/carrito"
              className="clip-btn glass relative flex h-10 items-center gap-2 px-4 text-xs font-bold uppercase tracking-wider transition-all hover:border-[var(--accent)]"
              aria-label="Carrito"
            >
              <motion.span key={bump} animate={bump ? { scale: [1, 1.25, 1] } : undefined}>
                <ShoppingBag size={16} />
              </motion.span>
              <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="clip-tag absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center bg-[var(--accent)] px-1 text-[10px] font-extrabold text-[var(--accent-ink)]">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="clip-btn glass flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú"
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
            className="glass-strong overflow-hidden border-b border-[var(--line)] md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `clip-btn px-4 py-3 text-sm font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                        : 'text-[var(--muted)] hover:bg-[var(--glass)]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-2 flex gap-2">
                {themes.map((t) => {
                  const Icon = t.icon
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`clip-btn flex flex-1 items-center justify-center gap-2 py-2.5 text-[11px] font-bold uppercase ${
                        theme === t.id
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                          : 'glass text-[var(--muted)]'
                      }`}
                    >
                      <Icon size={14} /> {t.label}
                    </button>
                  )
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
