import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export type Section = 'knifes' | 'kitchen'

export function sectionFromPath(pathname: string): Section {
  return pathname.startsWith('/kitchen') ? 'kitchen' : 'knifes'
}

/** Current section derived from the route (home reads as neutral knifes). */
export function useSection(): Section {
  const { pathname } = useLocation()
  const section = sectionFromPath(pathname)

  useEffect(() => {
    document.documentElement.dataset.section = section
    return () => {
      delete document.documentElement.dataset.section
    }
  }, [section])

  return section
}

/** True when the user is on the neutral landing (50/50 chooser). */
export function useIsHome(): boolean {
  const { pathname } = useLocation()
  return pathname === '/'
}
