import { guides } from './guides'
import type { FunFact, WikiTopic } from '../types'

export const wikiTopics: WikiTopic[] = [
  {
    id: 'tecnicas',
    title: 'Técnicas de cocina',
    description: 'Métodos esenciales explicados paso a paso y con consejos prácticos.',
    articles: guides,
  },
]

export const wikiFacts: FunFact[] = []
