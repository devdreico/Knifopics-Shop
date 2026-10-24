import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import SectionSwitcher from './SectionSwitcher'
import { sectionFromPath, sectionNav, type NavLink as NavItem } from '../../sections/config'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { count, bump } = useCart()
  const { pathname } = useLocation()

  const section = sectionFromPath(pathname)
  const { primary, extra } = sectionNav(section)

  useEffect(() => {
    setOpen(false)
    setMoreOpen(false)
  }, [pathname])

  const linkClass = (isActive: boolean) =>
    `clip-tag relative px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-150 ${
      isActive ? 'text-[var(--ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
    }`

  const renderItem = (l: NavItem) => (
    <NavLink
      key={l.to}
      to={l.to}
      end={l.end}
      className={({ isActive }) => linkClass(isActive)}
    >
      {({ isActive }) => (
        <>
          {l.label}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-2 bottom-0 h-[2px] bg-[var(--accent)]"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong backdrop-blur-2xl">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Knifopics inicio">
            <img
              src="/knifopics-logo.png"
              alt="Knifopics"
              className="h-9 w-auto object-contain"
              width={120}
              height={36}
            />
          </Link>

          {/* Barra central 50/50 — escritorio */}
          <div className="hidden justify-self-center md:block">
            <SectionSwitcher active={section === 'home' ? null : section} id="section-tab" />
          </div>

          <div className="flex items-center justify-end gap-2">
            <nav className="mr-1 hidden items-center gap-0.5 lg:flex" aria-label="Sección">
              {primary.map(renderItem)}

              {extra.length > 0 && (
                <div
                  className="relative"
                  onMouseEnter={() => setMoreOpen(true)}
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <button
                    type="button"
                    className="clip-tag flex items-center gap-1 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors duration-150 hover:text-[var(--ink)]"
                    aria-expanded={moreOpen}
                    aria-haspopup="true"
                    onClick={() => setMoreOpen((v) => !v)}
                    onFocus={() => setMoreOpen(true)}
                  >
                    Más
                    <ChevronDown size={12} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {moreOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        className="glass-strong absolute right-0 top-full z-50 min-w-[11rem] border border-[var(--line)] p-1.5 shadow-[var(--shadow-p)]"
                      >
                        {extra.map((l) => (
                          <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                              `block px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                                isActive
                                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                                  : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]'
                              }`
                            }
                          >
                            {l.label}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </nav>

            <Link
              to="/carrito"
              className="btn-knife relative flex h-10 items-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-4 pr-7 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--ink)] transition-all hover:border-[var(--ink)]"
              aria-label={`Carrito combinado, ${count} artículos`}
            >
              <motion.span key={bump} animate={bump ? { scale: [1, 1.2, 1] } : undefined}>
                <ShoppingBag size={15} strokeWidth={2.2} />
              </motion.span>
              <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="font-mono-nums absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center bg-[var(--accent)] px-1 text-[10px] font-extrabold text-[var(--accent-ink)]">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="btn-knife flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--surface)] lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Barra central 50/50 — móvil (fila inferior a todo el ancho) */}
        <div className="border-t border-[var(--line)] px-4 py-2 md:hidden">
          <div className="flex justify-center">
            <SectionSwitcher active={section === 'home' ? null : section} id="section-tab-mobile" />
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
            className="glass-strong overflow-hidden border-b border-[var(--line)] lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4" aria-label="Móvil">
              {[...primary, ...extra].map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `btn-knife px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] ${
                      isActive
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                        : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="btn-knife mt-1 border border-[var(--line)] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] hover:text-[var(--ink)]"
              >
                Inicio
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
