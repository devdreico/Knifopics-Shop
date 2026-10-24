import { Link } from 'react-router-dom'
import { Github, Instagram, Youtube } from 'lucide-react'
import { footerColumns } from '../../sections/config'

const columns = footerColumns()

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Github, label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[var(--line)] bg-[var(--surface)]/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <img
            src="/knifopics-logo.png"
            alt="Knifopics"
            className="h-12 w-auto object-contain"
            width={140}
            height={48}
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            50 % cuchillos, 50 % cocina. Tiendas, guías, wikis, noticias, academia, culturas y
            rankings — un solo carrito para todo, pago contra entrega.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
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

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--ink)]">
              {col.title}
            </h4>
            <div className="mt-3 h-px w-8 bg-[var(--accent)]" />
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link className="transition-colors hover:text-[var(--ink)]" to={l.to}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--line)] py-5">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-[var(--muted)] sm:px-6">
          © {new Date().getFullYear()} Knifopics Shop — Knifes & Kitchen, un solo carrito.
        </p>
      </div>
    </footer>
  )
}
