import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { sectionFromPath, type Section, type StoreSection } from '../sections/config'

export type { Section, StoreSection }
export { sectionFromPath }

/** Sección activa (derived de la URL) pintada en <html data-section>. */
export function useSection(): Section {
  const { pathname } = useLocation()
  const section = sectionFromPath(pathname)

  useEffect(() => {
    if (pathname.startsWith('/producto/')) return
    document.documentElement.dataset.section = section
  }, [pathname, section])

  return section
}

/** Sección de tienda; las rutas globales (carrito/checkout) caen en 'knifes'. */
export function useStoreSection(): StoreSection {
  const section = useSection()
  return section === 'home' ? 'knifes' : section
}

/** True cuando el usuario está en la landing 50/50. */
export function useIsHome(): boolean {
  const { pathname } = useLocation()
  return pathname === '/'
}
