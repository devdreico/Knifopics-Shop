import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Knifes from './pages/Knifes'
import Cocina from './pages/Cocina'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wiki from './pages/Wiki'
import WikiSection from './pages/WikiSection'
import Academia from './pages/Academia'

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
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/knifes" element={<Page><Knifes /></Page>} />
          <Route path="/cocina" element={<Page><Cocina /></Page>} />
          <Route path="/producto/:slug" element={<Page><Product /></Page>} />
          <Route path="/carrito" element={<Page><Cart /></Page>} />
          <Route path="/checkout" element={<Page><Checkout /></Page>} />
          <Route path="/wiki" element={<Page><Wiki /></Page>} />
          <Route path="/wiki/:section" element={<Page><WikiSection /></Page>} />
          <Route path="/academia" element={<Page><Academia /></Page>} />
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
