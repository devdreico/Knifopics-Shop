import type { AcademiaContent, ConversionResult, ConversionUnit } from '../types'

export const academia: AcademiaContent = {
  quiz: [
    {
      id: 'kq1',
      prompt: '¿Cuántos mililitros hay en una taza estándar de cocina?',
      options: ['150 ml', '200 ml', '240 ml', '350 ml'],
      correct: 2,
      explain: 'La taza estándar (cup) equivale a 240 ml; la taza métrica de 250 ml es otra convención.',
    },
    {
      id: 'kq2',
      prompt: 'Para dorar carne sin hervir, la sartén debe estar…',
      options: ['Tibia', 'Humo leve al tocar', 'Humo constante', 'A fuego mínimo'],
      correct: 1,
      explain: 'El punto de humo leve indica ~190-200 °C: suficiente para reacción de Maillard sin quemar grasa.',
    },
  ],
  cards: [
    { id: 'kc1', front: 'Mise en place', back: 'Todo preparado y medido antes de encender el fuego.', deck: 'Técnica' },
    { id: 'kc2', front: 'Wok hei', back: 'Sabor ahumado que solo da el wok a fuego muy alto con comida en movimiento.', deck: 'Técnica' },
  ],
  sessions: [
    {
      id: 'k-mise',
      title: 'Mise en place de la semana',
      meta: '35 min',
      note: 'Preparación · domingo',
      steps: [
        { title: 'Lavado y corte', body: 'Verduras lavadas, cortadas y secas en contenedores.', seconds: 600 },
        { title: 'Salsas base', body: 'Sofrito, caldo y aderezo en frascos etiquetados.', seconds: 480 },
        { title: 'Proteínas', body: 'Marinadas y porcionadas para 3 días.', seconds: 420 },
        { title: 'Orden final', body: 'Nevera organizada por uso, no por tipo.', seconds: 300 },
      ],
    },
  ],
  calc: 'conversions',
}

const VOLUME: Record<string, number> = { ml: 1, l: 1000, taza: 240, cda: 15, cdta: 5 }
const WEIGHT: Record<string, number> = { g: 1, kg: 1000, oz: 28.3495, lb: 453.592 }

function round(n: number): number {
  return Math.round(n * 10000) / 10000
}

export function convertKitchen(
  value: number,
  from: ConversionUnit,
  to: ConversionUnit,
): ConversionResult | null {
  if (from === to) {
    return { value: round(value), unit: to, formula: `${value} ${from} = ${value} ${to}` }
  }
  if (from === '°C' && to === '°F') {
    const r = round(value * 1.8 + 32)
    return { value: r, unit: to, formula: `°F = °C × 9/5 + 32 → ${r} °F` }
  }
  if (from === '°F' && to === '°C') {
    const r = round((value - 32) / 1.8)
    return { value: r, unit: to, formula: `°C = (°F − 32) × 5/9 → ${r} °C` }
  }
  const f = VOLUME[from]
  const t = VOLUME[to]
  if (f && t) {
    const r = round((value * f) / t)
    return { value: r, unit: to, formula: `${value} ${from} × ${f}/${t} = ${r} ${to}` }
  }
  const wf = WEIGHT[from]
  const wt = WEIGHT[to]
  if (wf && wt) {
    const r = round((value * wf) / wt)
    return { value: r, unit: to, formula: `${value} ${from} × ${wf}/${wt} = ${r} ${to}` }
  }
  return null
}
