import type { StoreSection } from '../sections/config'
import type {
  AcademiaContent,
  Culture,
  FunFact,
  Guide,
  NewsItem,
  Product,
  Ranking,
  WikiTopic,
} from './types'

import { products as knifesProducts } from './knifes/products'
import { products as kitchenProducts } from './kitchen/products'
import { guides as knifesGuides } from './knifes/guides'
import { guides as kitchenGuides } from './kitchen/guides'
import { wikiFacts as knifesFacts, wikiTopics as knifesTopics } from './knifes/wiki'
import { wikiFacts as kitchenFacts, wikiTopics as kitchenTopics } from './kitchen/wiki'
import { news as knifesNews } from './knifes/news'
import { news as kitchenNews } from './kitchen/news'
import { cultures as knifesCultures } from './knifes/cultures'
import { cultures as kitchenCultures } from './kitchen/cultures'
import { rankings as knifesRankings } from './knifes/rankings'
import { rankings as kitchenRankings } from './kitchen/rankings'
import { academia as knifesAcademia } from './knifes/academia'
import { academia as kitchenAcademia } from './kitchen/academia'

export { calculateSharpening } from './knifes/academia'
export type { CalcResult } from './knifes/academia'
export { convertKitchen } from './kitchen/academia'
export * from './types'

export function getProducts(section: StoreSection): Product[] {
  return section === 'knifes' ? knifesProducts : kitchenProducts
}

export function getAllProducts(): Product[] {
  return [...knifesProducts, ...kitchenProducts]
}

export function getProduct(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug)
}

export function getGuides(section: StoreSection): Guide[] {
  return section === 'knifes' ? knifesGuides : kitchenGuides
}

export function getGuide(section: StoreSection, slug: string): Guide | undefined {
  return getGuides(section).find((g) => g.slug === slug)
}

export function getWikiTopics(section: StoreSection): WikiTopic[] {
  return section === 'knifes' ? knifesTopics : kitchenTopics
}

export function getWikiTopic(section: StoreSection, id: string): WikiTopic | undefined {
  return getWikiTopics(section).find((t) => t.id === id)
}

export function getWikiFacts(section: StoreSection): FunFact[] {
  return section === 'knifes' ? knifesFacts : kitchenFacts
}

export function getNews(section: StoreSection): NewsItem[] {
  return section === 'knifes' ? knifesNews : kitchenNews
}

export function getNewsItem(section: StoreSection, slug: string): NewsItem | undefined {
  return getNews(section).find((n) => n.slug === slug)
}

export function getCultures(section: StoreSection): Culture[] {
  return section === 'knifes' ? knifesCultures : kitchenCultures
}

export function getCulture(section: StoreSection, slug: string): Culture | undefined {
  return getCultures(section).find((c) => c.slug === slug)
}

export function getRankings(section: StoreSection): Ranking[] {
  return section === 'knifes' ? knifesRankings : kitchenRankings
}

export function getAcademia(section: StoreSection): AcademiaContent {
  return section === 'knifes' ? knifesAcademia : kitchenAcademia
}
