import type { ReactNode } from 'react'

/**
 * Design system is single-theme (white/black). This provider only ensures
 * the document always carries a light color-scheme for native controls.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
