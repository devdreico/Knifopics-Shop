import { Link } from 'react-router-dom'
import { Github, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/knifopics-logo.png" alt="Knifopics" className="h-12 w-auto object-contain" />
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
                className="clip-btn glass flex h-10 w-10 items-center justify-center text-[var(--muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">Tienda</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link className="hover:text-[var(--ink)]" to="/knifes">Knifes</Link></li>
            <li><Link className="hover:text-[var(--ink)]" to="/cocina">Cocina</Link></li>
            <li><Link className="hover:text-[var(--ink)]" to="/carrito">Carrito</Link></li>
            <li><Link className="hover:text-[var(--ink)]" to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--accent)]">Explorar</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link className="hover:text-[var(--ink)]" to="/wiki">Wiki</Link></li>
            <li><Link className="hover:text-[var(--ink)]" to="/wiki/afilado">Manuales de afilado</Link></li>
            <li><Link className="hover:text-[var(--ink)]" to="/wiki/datos">Datos curiosos</Link></li>
            <li><Link className="hover:text-[var(--ink)]" to="/wiki/noticias">Noticias</Link></li>
            <li><Link className="hover:text-[var(--ink)]" to="/academia">Academia del filo</Link></li>
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
