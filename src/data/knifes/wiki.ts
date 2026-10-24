import { funFacts, sharpeningGuides } from '../wiki'
import type { FunFact, WikiTopic } from '../types'

export const wikiTopics: WikiTopic[] = [
  {
    id: 'afilado',
    title: 'Afilado',
    description: 'Piedras, ángulos y rituales para llevar cualquier hoja a espejo.',
    articles: sharpeningGuides,
  },
]

export const wikiFacts: FunFact[] = funFacts
