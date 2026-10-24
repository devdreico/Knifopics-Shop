import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import { STORE_SECTIONS } from './sections/config'

const Home = lazy(() => import('./pages/Home'))
const SectionStore = lazy(() => import('./pages/SectionStore'))
const Guides = lazy(() => import('./pages/Guides'))
const GuideDetail = lazy(() => import('./pages/GuideDetail'))
const Wiki = lazy(() => import('./pages/Wiki'))
const WikiSection = lazy(() => import('./pages/WikiSection'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Academia = lazy(() => import('./pages/Academia'))
const Culturas = lazy(() => import('./pages/Culturas'))
const CulturaDetail = lazy(() => import('./pages/CulturaDetail'))
const Rankings = lazy(() => import('./pages/Rankings'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }), [pathname])
  return null
}

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <span className="clip-tag bg-[var(--ink)] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white">
        Cargando…
      </span>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <ScrollTop />
      <Suspense fallback={<RouteFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ——— Landing 50/50 ——— */}
            <Route path="/" element={<Page><Home /></Page>} />

            {/* ——— Rutas espejo por sección (mismos módulos, distinto contenido) ——— */}
            {STORE_SECTIONS.map((s) => {
              const base = `/${s}`
              return (
                <Route key={s} path={base}>
                  <Route index element={<Page><SectionStore /></Page>} />
                  <Route path="guias" element={<Page><Guides /></Page>} />
                  <Route path="guias/:slug" element={<Page><GuideDetail /></Page>} />
                  <Route path="wiki" element={<Page><Wiki /></Page>} />
                  <Route path="wiki/:topic" element={<Page><WikiSection /></Page>} />
                  <Route path="noticias" element={<Page><News /></Page>} />
                  <Route path="noticias/:slug" element={<Page><NewsDetail /></Page>} />
                  <Route path="academia" element={<Page><Academia /></Page>} />
                  <Route path="culturas" element={<Page><Culturas /></Page>} />
                  <Route path="culturas/:slug" element={<Page><CulturaDetail /></Page>} />
                  <Route path="rankings" element={<Page><Rankings /></Page>} />
                </Route>
              )
            })}

            {/* ——— Globales: producto + carrito combinado ——— */}
            <Route path="/producto/:slug" element={<Page><Product /></Page>} />
            <Route path="/carrito" element={<Page><Cart /></Page>} />
            <Route path="/checkout" element={<Page><Checkout /></Page>} />

            {/* ——— Redirecciones de las rutas antiguas ——— */}
            <Route path="/wiki" element={<Navigate to="/knifes/wiki" replace />} />
            <Route path="/wiki/:section" element={<LegacyWikiRedirect />} />
            <Route path="/academia" element={<Navigate to="/knifes/academia" replace />} />
            <Route path="/noticias" element={<Navigate to="/knifes/noticias" replace />} />
            <Route path="/cocina" element={<Navigate to="/kitchen" replace />} />

            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}

function LegacyWikiRedirect() {
  const { pathname } = useLocation()
  const section = pathname.replace(/^\/wiki\/?/, '')
  return <Navigate to={`/knifes/wiki/${section}`} replace />
}
