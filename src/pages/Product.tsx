import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Zap, ArrowLeft, Check } from 'lucide-react'
import KnifeArt from '../components/ui/KnifeArt'
import PolygonButton from '../components/ui/PolygonButton'
import Reveal from '../components/ui/Reveal'
import ProductCard from '../components/ui/ProductCard'
import { getProduct, products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { slug } = useParams()
  const product = slug ? getProduct(slug) : undefined
  const { add } = useCart()

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold uppercase">Producto no encontrado</h1>
        <p className="mt-3 text-[var(--muted)]">El artículo que buscas no existe o fue retirado.</p>
        <div className="mt-8 flex justify-center gap-3">
          <PolygonButton to="/knifes">Volver a Knifes</PolygonButton>
          <PolygonButton to="/" variant="ghost">Inicio</PolygonButton>
        </div>
      </div>
    )
  }

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <Link
          to={product.category === 'knifes' ? '/knifes' : '/cocina'}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> Volver
        </Link>
      </Reveal>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass premium-shadow clip-hero edge-highlight relative flex min-h-[340px] items-center justify-center overflow-hidden p-8"
        >
          <div className="absolute inset-0 grid-lines opacity-40" />
          {product.tag && (
            <span className="clip-tag absolute left-5 top-5 z-10 bg-[var(--accent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent-ink)]">
              {product.tag}
            </span>
          )}
          <motion.div
            className="relative z-10 w-full max-w-lg"
            initial={{ scale: 0.9, rotate: -3 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <KnifeArt kind={product.art} tone={product.tone} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
            {product.category === 'knifes' ? 'Knifes' : 'Cocina'}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-mono-nums text-4xl font-extrabold">
              ${product.price.toLocaleString('es-AR')}
            </span>
            <span className="text-xs uppercase tracking-widest text-[var(--muted)]">ARS</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => add(product)}
              className="btn-knife glass inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ShoppingCart size={16} /> Añadir al carrito
            </button>
            <a
              href={product.mpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-knife inline-flex items-center gap-2 bg-[var(--accent)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[var(--accent-ink)] transition-all hover:brightness-110"
            >
              <Zap size={16} /> Pagar con MercadoPago
            </a>
          </div>

          <p className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
            <Check size={14} className="text-[var(--accent)]" />
            Link de pago único por producto · o contrareembolso en checkout
          </p>

          <div className="glass clip-card mt-8 p-5">
            <h2 className="border-b border-[var(--line)] pb-3 text-xs font-extrabold uppercase tracking-[0.2em]">
              Especificaciones
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex flex-col border-l-2 border-[var(--line)] pl-3">
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                    {s.label}
                  </dt>
                  <dd className="text-sm font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {product.care && (
            <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
              <strong className="text-[var(--ink)]">Cuidado:</strong> {product.care}
            </p>
          )}
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-extrabold uppercase tracking-tight">También te puede gustar</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
