import type { LucideIcon } from 'lucide-react'
import { BookOpen, CookingPot, Globe2, GraduationCap, Newspaper, Trophy } from 'lucide-react'

/** 'home' = landing y rutas globales (carrito/checkout/producto). */
export type Section = 'home' | 'knifes' | 'kitchen'
export type StoreSection = Exclude<Section, 'home'>

export type NavLink = { to: string; label: string; end?: boolean }

export type DiscoveryCard = {
  to: string
  icon: LucideIcon
  title: string
  body: string
}

export type SectionConfig = {
  id: StoreSection
  index: '01' | '02'
  label: string
  basePath: string
  tagline: string
  subtitle: string
  searchPlaceholder: string
  filterLabel: string
  seo: { title: string; description: string }
  discovery: DiscoveryCard[]
}

const knifesDiscovery: DiscoveryCard[] = [
  {
    to: '/knifes/guias',
    icon: BookOpen,
    title: 'Guías de cuchillo',
    body: 'Empuñadura, cortes y mantenimiento de cada tipo de hoja, paso a paso.',
  },
  {
    to: '/knifes/wiki',
    icon: BookOpen,
    title: 'Wiki del filo',
    body: 'Aceros, técnicas de afilado y datos que ningún vendedor te cuenta.',
  },
  {
    to: '/knifes/noticias',
    icon: Newspaper,
    title: 'Noticias del filo',
    body: 'Lanzamientos, industria y tendencias de cuchillería, actualizadas.',
  },
  {
    to: '/knifes/academia',
    icon: GraduationCap,
    title: 'Academia',
    body: 'Quiz, flashcards, calculadora de ángulos y sesiones con timer.',
  },
  {
    to: '/knifes/culturas',
    icon: Globe2,
    title: 'Culturas del filo',
    body: 'Japón, Alemania, Francia y más: tradición de cuchillería por región.',
  },
  {
    to: '/knifes/rankings',
    icon: Trophy,
    title: 'Rankings',
    body: 'Los mejores aceros, hojas y marcas, ordenados y explicados.',
  },
]

const kitchenDiscovery: DiscoveryCard[] = [
  {
    to: '/kitchen/guias',
    icon: CookingPot,
    title: 'Guías de cocina',
    body: 'Hierro fundido, wok, cocción lenta y mise en place — paso a paso.',
  },
  {
    to: '/kitchen/wiki',
    icon: BookOpen,
    title: 'Wiki de cocina',
    body: 'Técnicas, utensilios y datos que separan al aficionado del cocinero.',
  },
  {
    to: '/kitchen/noticias',
    icon: Newspaper,
    title: 'Noticias de cocina',
    body: 'Tendencias, recetas y novedades de gastronomía, actualizadas.',
  },
  {
    to: '/kitchen/academia',
    icon: GraduationCap,
    title: 'Academia',
    body: 'Quiz, flashcards, conversiones y sesiones con timer.',
  },
  {
    to: '/kitchen/culturas',
    icon: Globe2,
    title: 'Culturas del mundo',
    body: 'Japón, Italia, México, Francia, Argentina y Perú con sus platos.',
  },
  {
    to: '/kitchen/rankings',
    icon: Trophy,
    title: 'Rankings famosos',
    body: 'Top sartenes, cocinas del mundo, gadgets y platos más difíciles.',
  },
]

export const SECTIONS: Record<StoreSection, SectionConfig> = {
  knifes: {
    id: 'knifes',
    index: '01',
    label: 'Knifes',
    basePath: '/knifes',
    tagline: 'El filo como disciplina',
    subtitle:
      'Solo cuchillos premium: japoneses, occidentales, damascus y sets de mesa — con sus guías paso a paso.',
    searchPlaceholder: 'Buscar cuchillo, acero…',
    filterLabel: 'Filtrar por acero',
    seo: {
      title: 'Knifes — Cuchillos premium | Knifopics',
      description:
        'Cuchillos damascus, japoneses y occidentales con guías, wiki del filo, academia y noticias. Un solo carrito con Kitchen.',
    },
    discovery: knifesDiscovery,
  },
  kitchen: {
    id: 'kitchen',
    index: '02',
    label: 'Kitchen',
    basePath: '/kitchen',
    tagline: 'Cocina con intención',
    subtitle:
      'Sartenes, ollas, gadgets y objetos de cocina. Todo contra entrega, todo a tu carrito combinado.',
    searchPlaceholder: 'Buscar sartén, gadget, material…',
    filterLabel: 'Filtrar por categoría',
    seo: {
      title: 'Kitchen — Utensilios y cocina | Knifopics',
      description:
        'Sartenes, ollas y gadgets con guías, wiki de cocina, culturas gastronómicas y noticias. Un solo carrito con Knifes.',
    },
    discovery: kitchenDiscovery,
  },
}

export const STORE_SECTIONS: StoreSection[] = ['knifes', 'kitchen']

export const globalNav: NavLink[] = [
  { to: '/knifes', label: 'Knifes' },
  { to: '/kitchen', label: 'Kitchen' },
]

export type SectionNav = { primary: NavLink[]; extra: NavLink[] }

export function sectionNav(section: Section): SectionNav {
  if (section === 'home') return { primary: globalNav, extra: [] }
  const base = SECTIONS[section].basePath
  return {
    primary: [
      { to: base, label: 'Tienda', end: true },
      { to: `${base}/guias`, label: 'Guías' },
      { to: `${base}/wiki`, label: 'Wiki' },
      { to: `${base}/noticias`, label: 'Noticias' },
    ],
    extra: [
      { to: `${base}/academia`, label: 'Academia' },
      { to: `${base}/culturas`, label: 'Culturas' },
      { to: `${base}/rankings`, label: 'Rankings' },
    ],
  }
}

export function sectionFromPath(pathname: string): Section {
  if (pathname === '/' || pathname.startsWith('/kitchen')) {
    return pathname.startsWith('/kitchen') ? 'kitchen' : 'home'
  }
  if (pathname.startsWith('/knifes')) return 'knifes'
  return 'home'
}

export function footerColumns(): { title: string; links: NavLink[] }[] {
  const sectionCols = STORE_SECTIONS.map((s) => {
    const nav = sectionNav(s)
    const base = SECTIONS[s].basePath
    return {
      title: SECTIONS[s].label,
      links: [
        { to: base, label: `Catálogo de ${s === 'knifes' ? 'cuchillos' : 'cocina'}` },
        ...nav.primary.slice(1).map((l) => ({ ...l, end: false })),
        ...nav.extra.map((l) => ({ ...l, end: false })),
      ],
    }
  })
  return [
    ...sectionCols,
    {
      title: 'Compra',
      links: [
        { to: '/carrito', label: 'Carrito combinado' },
        { to: '/checkout', label: 'Checkout contra entrega' },
        { to: '/', label: 'Elegir sección' },
      ],
    },
  ]
}
