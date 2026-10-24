import type { ArtKind, Tone } from '../components/ui/KnifeArt'

/* ——— Catálogo ——— */

export type Category = 'knifes' | 'kitchen'

export type Product = {
  slug: string
  name: string
  category: Category
  family?: string
  price: number
  short: string
  description: string
  art: ArtKind
  tone: Tone
  tag?: string
  steel?: string
  length?: string
  hardness?: string
  weight?: string
  origin?: string
  care?: string
  specs: { label: string; value: string }[]
}

/* ——— Guías (también artículos de wiki) ——— */

export type GuideStep = { title: string; body: string; tip?: string }

export type GuideLevel = 'Inicial' | 'Intermedio' | 'Avanzado'

export type Guide = {
  slug: string
  title: string
  excerpt: string
  minutes: number
  level: GuideLevel
  art?: ArtKind
  steps: GuideStep[]
}

/* ——— Wiki ——— */

export type WikiTopic = {
  id: string
  title: string
  description: string
  articles: Guide[]
}

export type FunFact = {
  id: string
  title: string
  body: string
  tag: string
}

/* ——— Noticias ——— */

export type NewsItem = {
  slug: string
  title: string
  date: string
  excerpt: string
  tag: string
  body: string[]
  source?: string
  url?: string
}

/* ——— Culturas ——— */

export type CultureDish = { name: string; note: string }

export type Culture = {
  slug: string
  name: string
  region: string
  tagline: string
  description: string
  dishes: CultureDish[]
  essentials: { name: string; productSlug?: string }[]
  tip: string
}

/* ——— Rankings ——— */

export type RankingItem = {
  rank: number
  name: string
  desc: string
  meta?: string
}

export type Ranking = {
  id: string
  title: string
  subtitle: string
  tag: string
  items: RankingItem[]
}

/* ——— Academia ——— */

export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correct: number
  explain: string
}

export type Flashcard = {
  id: string
  front: string
  back: string
  deck: string
}

export type StudyStep = { title: string; body: string; seconds: number }

export type StudySession = {
  id: string
  title: string
  meta: string
  note: string
  steps: StudyStep[]
}

export type CalcKind = 'sharpening' | 'conversions'

export type AcademiaContent = {
  quiz: QuizQuestion[]
  cards: Flashcard[]
  sessions: StudySession[]
  calc: CalcKind
}

export type SharpeningCalcResult = {
  anglePerSide: number
  inclusive: number
  gritStart: number
  gritEnd: number
  notes: string[]
}

export type ConversionUnit = 'ml' | 'l' | 'taza' | 'cda' | 'cdta' | 'g' | 'kg' | 'oz' | 'lb' | '°C' | '°F'

export type ConversionResult = { value: number; unit: ConversionUnit; formula: string }

/* ——— Noticias en vivo (RSS) ——— */

export type LiveNewsItem = {
  title: string
  link: string
  date: string
  excerpt: string
  source: string
}
