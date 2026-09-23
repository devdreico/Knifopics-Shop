import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../../data/products'
import { useCart } from '../../context/CartContext'
import KnifeArt from './KnifeArt'

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart()

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="glass premium-shadow clip-card edge-highlight group flex flex-col overflow-hidden transition-shadow duration-200 hover:shadow-[var(--shadow-hover)]"
    >
      <Link
        to={`/producto/${product.slug}`}
        className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-[var(--surface-2)] p-6"
      >
        <div className="absolute inset-0 grid-lines opacity-50" />
        <motion.div
          className="relative z-10 w-full max-w-[280px]"
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <KnifeArt kind={product.art} tone={product.tone} />
        </motion.div>
        {product.tag && (
          <span className="clip-tag absolute top-4 left-4 z-10 bg-[var(--ink)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent-ink)]">
            {product.tag}
          </span>
        )}
      </Link>

      <div className="relative z-10 flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
            {product.category === 'knifes' ? 'Knifes' : 'Cocina'}
          </p>
          <h3 className="mt-1 text-lg leading-tight font-extrabold uppercase">
            <Link
              to={`/producto/${product.slug}`}
              className="transition-colors hover:text-[var(--muted)]"
            >
              {product.name}
            </Link>
          </h3>
        </div>

        <p className="line-clamp-2 text-sm text-[var(--muted)]">{product.short}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="font-mono-nums text-xl font-extrabold">
            ${product.price.toLocaleString('es-AR')}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => add(product)}
              aria-label={`Añadir ${product.name} al carrito`}
              className="btn-knife flex h-10 w-10 items-center justify-center border border-[var(--line)] bg-[var(--surface)] transition-all hover:border-[var(--ink)]"
            >
              <ShoppingCart size={15} strokeWidth={2.2} />
            </button>
            <Link
              to={`/producto/${product.slug}`}
              className="btn-knife bg-[var(--accent)] px-5 py-2.5 pr-7 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--accent-ink)] transition-all hover:translate-x-0.5"
            >
              Ver
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
