import { Link } from 'react-router-dom'
import { Github, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[var(--line)] bg-[var(--surface)]/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src="/knifopics-logo.png"
            alt="Knifopics"
            className="h-12 w-auto object-contain"
            width={140}
            height={48}
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            Cuchillos premium, objetos de cocina y la wiki definitiva del mundo del filo.
            Afilado, acero, historia y cultura knife — todo en un solo lugar.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Youtube, label: 'YouTube' },
              { icon: Github, label: 'GitHub' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="btn-knife flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition-all hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--ink)]">
            Tienda
          </h4>
          <div className="mt-3 h-px w-8 bg-[var(--ink)]" />
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/knifes">Knifes</Link></li>
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/cocina">Cocina</Link></li>
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/carrito">Carrito</Link></li>
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--ink)]">
            Explorar
          </h4>
          <div className="mt-3 h-px w-8 bg-[var(--ink)]" />
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/wiki">Wiki</Link></li>
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/wiki/afilado">Manuales de afilado</Link></li>
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/wiki/datos">Datos curiosos</Link></li>
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/wiki/noticias">Noticias</Link></li>
            <li><Link className="transition-colors hover:text-[var(--ink)]" to="/academia">Academia del filo</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-5">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-[var(--muted)] sm:px-6">
          © {new Date().getFullYear()} Knifopics Shop — Premium blades & kitchen culture.
        </p>
      </div>
    </footer>
  )
}
