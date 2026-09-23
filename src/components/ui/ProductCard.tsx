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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group glass premium-shadow clip-card edge-highlight flex flex-col overflow-hidden"
    >
      <Link to={`/producto/${product.slug}`} className="relative block bg-[var(--surface-2)] p-6 min-h-[220px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <motion.div
          className="relative z-10 w-full max-w-[280px]"
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <KnifeArt kind={product.art} />
        </motion.div>
        {product.tag && (
          <span className="clip-tag absolute top-4 left-4 z-10 bg-[var(--accent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-ink)]">
            {product.tag}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--steel)]">
              {product.category === 'knifes' ? 'Knifes' : 'Cocina'}
            </p>
            <h3 className="mt-1 text-lg font-extrabold leading-tight uppercase">
              <Link to={`/producto/${product.slug}`} className="transition-colors hover:text-[var(--accent)]">
                {product.name}
              </Link>
            </h3>
          </div>
        </div>

        <p className="text-sm text-[var(--muted)] line-clamp-2">{product.short}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-xl font-extrabold">${product.price.toLocaleString('es-AR')}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => add(product)}
              aria-label={`Añadir ${product.name} al carrito`}
              className="clip-btn glass flex h-10 w-10 items-center justify-center transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ShoppingCart size={16} />
            </button>
            <Link
              to={`/producto/${product.slug}`}
              className="clip-btn bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)] transition-all hover:brightness-110"
            >
              Ver
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
