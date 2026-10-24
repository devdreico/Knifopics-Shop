import { flashcards, quizQuestions, sharpeningSessions } from '../academy'
import type { AcademiaContent } from '../types'

export const academia: AcademiaContent = {
  quiz: quizQuestions,
  cards: flashcards,
  sessions: sharpeningSessions.map((s) => ({
    id: s.id,
    title: s.knife,
    meta: s.angle,
    note: s.gritNote,
    steps: s.steps,
  })),
  calc: 'sharpening',
}

export { calculateSharpening } from '../academy'
export type { CalcResult } from '../academy'
