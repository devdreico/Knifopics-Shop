import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSection } from '../hooks/useSection'

export default function NotFound() {
  const section = useSection()
  const isKitchen = section === 'kitchen'

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <span className="clip-tag bg-[var(--accent)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.3em] text-[var(--accent-ink)]">
        Error 404
      </span>
      <h1 className="mt-6 text-5xl font-extrabold uppercase leading-none tracking-[-0.04em] sm:text-6xl">
        Página fuera de filo
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
        El enlace que buscas no existe o fue movido. Volvé al inicio o seguí explorando la sección
        {isKitchen ? ' Kitchen' : ' Knifes'}.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="btn-knife bg-[var(--accent)] px-7 py-3.5 pr-9 text-sm font-bold uppercase tracking-wider text-[var(--accent-ink)]"
        >
          Volver al inicio <ArrowRight size={15} />
        </Link>
        <Link
          to={isKitchen ? '/kitchen' : '/knifes'}
          className="btn-knife glass px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition hover:border-[var(--ink)]"
        >
          Ir a la tienda
        </Link>
      </div>
    </div>
  )
}
