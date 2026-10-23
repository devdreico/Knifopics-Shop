import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Knifes from './pages/Knifes'
import Guides from './pages/Guides'
import GuideDetail from './pages/GuideDetail'
import Wiki from './pages/Wiki'
import WikiSection from './pages/WikiSection'
import Academia from './pages/Academia'
import Kitchen from './pages/Kitchen'
import Culturas from './pages/Culturas'
import CulturaDetail from './pages/CulturaDetail'
import Rankings from './pages/Rankings'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

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

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <ScrollTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ——— Landing 50/50 ——— */}
          <Route path="/" element={<Page><Home /></Page>} />

          {/* ——— Sección KNIFES ——— */}
          <Route path="/knifes" element={<Page><Knifes /></Page>} />
          <Route path="/knifes/guias" element={<Page><Guides /></Page>} />
          <Route path="/knifes/guias/:slug" element={<Page><GuideDetail /></Page>} />
          <Route path="/knifes/wiki" element={<Page><Wiki /></Page>} />
          <Route path="/knifes/wiki/:section" element={<Page><WikiSection /></Page>} />
          <Route path="/knifes/academia" element={<Page><Academia /></Page>} />

          {/* ——— Sección KITCHEN ——— */}
          <Route path="/kitchen" element={<Page><Kitchen /></Page>} />
          <Route path="/kitchen/guias" element={<Page><Guides /></Page>} />
          <Route path="/kitchen/guias/:slug" element={<Page><GuideDetail /></Page>} />
          <Route path="/kitchen/culturas" element={<Page><Culturas /></Page>} />
          <Route path="/kitchen/culturas/:slug" element={<Page><CulturaDetail /></Page>} />
          <Route path="/kitchen/rankings" element={<Page><Rankings /></Page>} />

          {/* ——— Globales: producto + carrito combinado ——— */}
          <Route path="/producto/:slug" element={<Page><Product /></Page>} />
          <Route path="/carrito" element={<Page><Cart /></Page>} />
          <Route path="/checkout" element={<Page><Checkout /></Page>} />

          {/* ——— Redirecciones de las rutas antiguas ——— */}
          <Route path="/wiki" element={<Navigate to="/knifes/wiki" replace />} />
          <Route path="/wiki/:section" element={<LegacyWikiRedirect />} />
          <Route path="/academia" element={<Navigate to="/knifes/academia" replace />} />
          <Route path="/cocina" element={<Navigate to="/kitchen" replace />} />

          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

function LegacyWikiRedirect() {
  const { pathname } = useLocation()
  const section = pathname.replace(/^\/wiki\/?/, '')
  return <Navigate to={`/knifes/wiki/${section}`} replace />
}
