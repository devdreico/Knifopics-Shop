export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correct: number
  explain: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: '¿Qué cuchillo tiene hoja recta y alta, ideal para vegetales con corte perpendicular?',
    options: ['Santoku', 'Nakiri', 'Bowie', 'Serrucho'],
    correct: 1,
    explain: 'El nakiri es un cuchillo vegetal japonés de perfil rectangular que corta hasta la tabla sin balancear.',
  },
  {
    id: 'q2',
    prompt: 'Un chef te pide 15° por lado para su gyuto japonés. ¿Qué grano usas para refilar y luego pulir?',
    options: ['400 → 800', '1000 → 6000', '3000 → 12000', 'Solo lija 120'],
    correct: 1,
    explain: 'El dúo 1000/6000 es el estándar doméstico-profesional: 1000 forma el reborde, 6000 lo afina a espejo.',
  },
  {
    id: 'q3',
    prompt: '¿Qué significa “67 capas damascus”?',
    options: [
      '67 aceros distintos soldados',
      'Capas forjadas alrededor de un núcleo',
      '67 pasos de pulido',
      'Una patente de la marca',
    ],
    correct: 1,
    explain: 'Damascus moderno es acero multicapa forjado: capas exteriores decorativas/tenaces sobre un núcleo duro.',
  },
  {
    id: 'q4',
    prompt: '¿Cuál es la función REAL de la varilla de acero (honing rod)?',
    options: [
      'Sacar filo nuevo',
      'Re-centrar el filo doblado',
      'Pulir a espejo',
      'Medir ángulos',
    ],
    correct: 1,
    explain: 'El honing realinea el micro-borde doblado por el uso; no reemplaza al refilado con piedra.',
  },
  {
    id: 'q5',
    prompt: '¿Qué dureza Rockwell es típica de un chef japonés de gama premium?',
    options: ['48-52 HRC', '54-56 HRC', '60-62 HRC', '68+ HRC'],
    correct: 2,
    explain: 'Los VG-10 y similares suelen vivir en 60-61 HRC; Shirogami puede llegar a 62-63.',
  },
  {
    id: 'q6',
    prompt: 'El cuchillo de pan necesita…',
    options: [
      'Bisel de 25° liso',
      'Dentado afilado diente por diente',
      'Solo honing semanal',
      'Nunca se afila',
    ],
    correct: 1,
    explain: 'El serrucho se trabaja con piedra cerámica o varilla fina siguiendo cada diente en un solo sentido.',
  },
  {
    id: 'q7',
    prompt: '¿Cuál es el peor almacenamiento para el filo?',
    options: [
      'Bloque de madera',
      'Imán de pared',
      'Suelto en un cajón metálico',
      'Funda individual',
    ],
    correct: 2,
    explain: 'En un cajón el filo choca con otros objetos y se microscopia de inmediato.',
  },
  {
    id: 'q8',
    prompt: '¿Qué test casero revela un filo verdaderamente bueno?',
    options: [
      'Cortar tomate maduro sin presión',
      'Golpear madera',
      'Dejar la uña sobre el filo',
      'Cortar papel de diario en seco sobre vidrio',
    ],
    correct: 0,
    explain: 'La piel elástica del tomate solo se abre con un borde microscópico; si se aplasta, falta filo.',
  },
]

export type Flashcard = {
  id: string
  front: string
  back: string
  deck: 'Acero' | 'Afilado' | 'Tipos' | 'Cultura'
}

export const flashcards: Flashcard[] = [
  { id: 'f1', front: 'VG-10', back: 'Acero japonés inoxidable premium, ~60 HRC, común en damascus de gama media-alta.', deck: 'Acero' },
  { id: 'f2', front: 'Shirogami #2', back: 'Acero blanco #2: carbono puro, filo monstruoso, oxida fácil. 61-63 HRC.', deck: 'Acero' },
  { id: 'f3', front: '14C28N', back: 'Inoxidable Sandvik: buen balance filo/resistencia, ideal steak y EDC culinary.', deck: 'Acero' },
  { id: 'f4', front: 'HRC', back: 'Escala Rockwell C: resistencia a la indentación. Más alto = más duro, menos tough.', deck: 'Acero' },
  { id: 'f5', front: 'Reborde (burr)', back: 'Gancho microscópico que aparece al afilar: señal de que el grano llegó al borde opuesto.', deck: 'Afilado' },
  { id: 'f6', front: 'Piedra 1000 grit', back: 'Gris medio: forma el filo de trabajo. Después se pule con 3000-6000.', deck: 'Afilado' },
  { id: 'f7', front: 'Ángulo chef occidental', back: '20° por lado (40° total incluido).', deck: 'Afilado' },
  { id: 'f8', front: 'Ángulo santoku/nakiri', back: '15° por lado para cortes limpios en vegetales.', deck: 'Afilado' },
  { id: 'f9', front: 'Santoku', back: '“Tres virtudes”: pescado, carne, vegetal. Hoja más baja y ancha que el chef.', deck: 'Tipos' },
  { id: 'f10', front: 'Nakiri', back: 'Recto, vegetal puro, corte vertical hasta la tabla.', deck: 'Tipos' },
  { id: 'f11', front: 'Yanagiba', back: 'Hoja larga y fina para sashimi: corte de un solo tirón.', deck: 'Tipos' },
  { id: 'f12', front: 'Cleaver vs chef', back: 'Cleaver: masa y hueso pequeño. Chef: precisión y versatilidad.', deck: 'Tipos' },
  { id: 'f13', front: 'Seki (Japón)', back: 'Cuna de la cuchillería japonesa, tradición desde el siglo XII.', deck: 'Cultura' },
  { id: 'f14', front: 'Patina vs óxido', back: 'Patina = pátina protectora gris/azul. Óxido = naranja rugoso y activo.', deck: 'Cultura' },
  { id: 'f15', front: 'Whetstone', back: 'De “hwhet” (afilar), no de “wet” — aunque casi siempre se moja.', deck: 'Cultura' },
  { id: 'f16', front: 'Damascus moderno', back: 'Patrón de capas forjadas; el núcleo define la dureza real.', deck: 'Cultura' },
]

export type SharpeningStep = {
  title: string
  body: string
  seconds: number
}

export type SharpeningSession = {
  id: string
  knife: string
  angle: string
  gritNote: string
  steps: SharpeningStep[]
}

export const sharpeningSessions: SharpeningSession[] = [
  {
    id: 'chef-basic',
    knife: 'Chef / Gyuto 20°',
    angle: '20° por lado',
    gritNote: '1000 → 6000',
    steps: [
      { title: 'Remojo y setup', body: 'Piedra en base, agua generosa, toalla antideslizante.', seconds: 60 },
      { title: 'Barridos lado A (1000)', body: 'Talón a punta, presión media, 8 barridos.', seconds: 45 },
      { title: 'Barridos lado B (1000)', body: 'Mismo ángulo, 8 barridos. Alterna hasta sentir reborde.', seconds: 45 },
      { title: 'Cambio de grano', body: 'Enjuaga, pasa a 6000. Presión ligera.', seconds: 30 },
      { title: 'Pulido lado A', body: 'Barridos suaves de talón a punta.', seconds: 40 },
      { title: 'Pulido lado B', body: 'Igual, 4-6 barridos por lado.', seconds: 40 },
      { title: 'Prueba de papel', body: 'Corta papel colgado: debe entrar sin tirar.', seconds: 30 },
    ],
  },
  {
    id: 'santoku-fine',
    knife: 'Santoku / Nakiri 15°',
    angle: '15° por lado',
    gritNote: '1000 → 6000',
    steps: [
      { title: 'Setup fino', body: 'Ángulo más agresivo: apoya monedas de guía si hace falta.', seconds: 45 },
      { title: 'Forma de filo 1000', body: 'Presión media, alterna lados cada 6 barridos.', seconds: 50 },
      { title: 'Reborde completo', body: 'Verifica de talón a punta con la uña.', seconds: 30 },
      { title: 'Pulido 6000', body: 'Ligero y constante; sin prisa.', seconds: 50 },
      { title: 'Limpieza y prueba', body: 'Enjuaga, seca, corta tomate o papel.', seconds: 35 },
    ],
  },
  {
    id: 'honing-quick',
    knife: 'Honing rápido (varilla)',
    angle: 'Mismo ángulo de fábrica',
    gritNote: 'Sin piedra — solo realinear',
    steps: [
      { title: 'Coloca la varilla', body: 'Vertical, sobre tabla estable. Ángulo del cuchillo = fábrica.', seconds: 20 },
      { title: 'Lado A', body: 'Desliza talón→punta con peso pluma. 4 repeticiones.', seconds: 30 },
      { title: 'Lado B', body: 'Idéntico. Mantén el arco constante.', seconds: 30 },
      { title: 'Check filo', body: 'Prueba el papel. Si no corta, toca piedra.', seconds: 20 },
    ],
  },
]

export type CalcResult = {
  anglePerSide: number
  inclusive: number
  gritStart: number
  gritEnd: number
  notes: string[]
}

export function calculateSharpening(input: {
  steel: 'inox-carbon' | 'inox-alto' | 'damascus-vg' | 'carbono-blanco' | 'duralumin'
  usage: 'hogar' | 'pro' | 'hueso'
  width: number
}): CalcResult {
  let angle = 20
  const notes: string[] = []

  switch (input.steel) {
    case 'inox-carbon':
      angle = 20
      notes.push('Acero inoxidable estándar: aguanta 20° con tranquilidad.')
      break
    case 'inox-alto':
      angle = 18
      notes.push('Inox alto rendimiento: 18° ofrece corte fino sin astillarse fácil.')
      break
    case 'damascus-vg':
      angle = 15
      notes.push('Núcleo VG-10 / damascus: 15° por lado aprovecha la dureza 60+ HRC.')
      break
    case 'carbono-blanco':
      angle = 15
      notes.push('Carbono japonés: filo quirúrgico a 15° — cuidado con la presión lateral.')
      break
    case 'duralumin':
      angle = 22
      notes.push('Aleación blanda / utilitario: 22° para resistir deformación.')
      break
  }

  if (input.usage === 'pro') {
    angle = Math.max(13, angle - 2)
    notes.push('Uso profesional: afinamos 2° más para respuesta inmediata en servicio.')
  }
  if (input.usage === 'hueso') {
    angle = angle + 3
    notes.push('Impacto sobre hueso: +3° de bisel para evitar astillado.')
  }

  if (input.width < 1.2) {
    notes.push('Hoja delgada (<1.2 mm): presión ligera para no redondear el bisel.')
  } else if (input.width > 2.4) {
    notes.push('Hoja gruesa (>2.4 mm): trabaja por secciones y verifica simetría.')
  }

  const gritStart = input.steel === 'carbono-blanco' ? 800 : 1000
  const gritEnd = input.usage === 'hueso' ? 3000 : input.usage === 'pro' ? 6000 : 5000

  return {
    anglePerSide: angle,
    inclusive: angle * 2,
    gritStart,
    gritEnd,
    notes,
  }
}
