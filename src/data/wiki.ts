export type SharpeningGuide = {
  slug: string
  title: string
  excerpt: string
  minutes: number
  level: 'Inicial' | 'Intermedio' | 'Avanzado'
  steps: { title: string; body: string; tip?: string }[]
}

export const sharpeningGuides: SharpeningGuide[] = [
  {
    slug: 'piedra-agua-101',
    title: 'Piedra de agua 101: primer refilado',
    excerpt:
      'Domina el ritual básico con una piedra doble cara: mojar, ángulo, presión y el test del papel.',
    minutes: 8,
    level: 'Inicial',
    steps: [
      {
        title: 'Prepara la piedra',
        body: 'Sumerge la piedra en agua limpia 5-10 minutos hasta que dejen de salir burbujas. Usa una base antideslizante sobre una toalla húmeda.',
        tip: 'Nunca uses aceite en piedras de agua; solo agua.',
      },
      {
        title: 'Elige el ángulo',
        body: 'Para cuchillos occidentales, 20° por lado. Para japoneses finos, 15°. Coloca dos monedas bajo el filo de apoyo si necesitas guía visual.',
        tip: 'Constantidad mata ángulo perfecto: mejor 17° estables que 15° inestables.',
      },
      {
        title: 'Barridos con el grano 1000',
        body: 'Con el cuchillo en horizontal, empuja desde el talón hacia la punta aplicando presión media. Alterna lados cada 6-8 barridos.',
      },
      {
        title: 'Detecta el reborde (burr)',
        body: 'Con la uña, busca un gancho microscopic en el borde opuesto. Cuando el reborde corre de punta a talón en ambos lados, el grano grueso terminó.',
      },
      {
        title: 'Pulido 6000',
        body: 'Repite el proceso con presión ligera en la cara 6000. Esto afina el reborde y lleva el filo a espejo.',
        tip: 'Presión ligera = filo más fino y duradero.',
      },
      {
        title: 'Prueba final',
        body: 'Corta un papel colgado o pelate una uña con cuidado. Un filo bueno entra sin empujar y sin desviarse.',
      },
    ],
  },
  {
    slug: 'angulos-por-tipo',
    title: 'Ángulos por tipo de cuchillo',
    excerpt:
      'Chef, santoku, nakiri, serrucho y cuchillo de carne: qué ángulo le corresponde a cada hoja.',
    minutes: 6,
    level: 'Intermedio',
    steps: [
      {
        title: 'Chef y gyuto (15-20°)',
        body: 'Hoja versátil con belleza en el corte:mince, dice, juliana. 15° para aceros japoneses duros, 20° para aleaciones alemanas más tough.',
      },
      {
        title: 'Santoku y nakiri (15°)',
        body: 'Geometría delgada pensada para vegetales. Ángulos más agresivos reducen la fricción en cortes verticales.',
      },
      {
        title: 'Cuchillo de pan (15-18° solo bisel)',
        body: 'El dentado se afila con piedra cerámica o varilla, siguiendo cada diente individual en un solo sentido.',
      },
      {
        title: 'Cleaver y carne (20-22°)',
        body: 'Más masa y más impacto: un bisel más ancho resiste astillado al golpear huesos pequeños.',
      },
      {
        title: 'Steak de mesa (18°)',
        body: 'Menos frecuente pero exigente: debe cortar bistec sin tirar. Refila con poco grano y pule en seguida.',
      },
      {
        title: 'Regla de oro',
        body: 'Más duro el acero → ángulo más fino posible. Más golpe recibe → ángulo un poco más ancho.',
      },
    ],
  },
  {
    slug: 'mantener-el-filo',
    title: 'Cómo mantener el filo entre sesiones',
    excerpt:
      'Honing, tabla correcta, lavado y almacenamiento: la rutina que duplica los días de filo.',
    minutes: 5,
    level: 'Inicial',
    steps: [
      {
        title: 'Honing en cada uso',
        body: 'Pasa el cuchillo por la varilla de acero 4-6 veces por lado con ángulo constante. No afila: re-centra el filo doblado.',
      },
      {
        title: 'Tabla de madera o composite',
        body: 'Evita vidrio, piedra y porcelana. El filo se microscopia contra superficies duras y muere en días.',
      },
      {
        title: 'Lavado inmediato',
        body: 'Lava a mano con jabón neutro y seca de inmediato. Los ácidos (tomate, cítricos) manchan el acero al carbono.',
      },
      {
        title: 'Almacenar protegido',
        body: 'Bloque, imán o funda magnética. Nunca suelto en un cajón: el filo choca contra otros metales.',
      },
      {
        title: 'Calendario de refilado',
        body: 'Uso doméstico: refila cada 2-4 semanas con 1000/6000. Uso intensivo: cada semana.',
        tip: 'Si el cuchillo no corta tomate maduro sin presión, ya llegó el día.',
      },
    ],
  },
]

export type FunFact = {
  id: string
  title: string
  body: string
  tag: string
}

export const funFacts: FunFact[] = [
  {
    id: 'jf-1',
    title: 'El acero al carbono “sangra”',
    body: 'Un cuchillo de carbono oscurece limón y manzana si no se enjuaga rápido: el hierro libre reacciona con los ácidos. No es óxido — es pátina de uso.',
    tag: 'Materiales',
  },
  {
    id: 'jf-2',
    title: 'Damascus no es un acero',
    body: '“Damascus” describe el patrón de forja de múltiples capas, no una aleación. Puede tener núcleo VG-10, SG2 o incluso carbono.',
    tag: 'Forja',
  },
  {
    id: 'jf-3',
    title: 'Más HRC ≠ mejor cuchillo',
    body: 'La dureza Rockwell mide resistencia a la marca, no calidad. Un 64 HRC que se astilla no le gana a un 58 HRC bien termotratado.',
    tag: 'Datos',
  },
  {
    id: 'jf-4',
    title: 'Seki: 800 años de cuchillería',
    body: 'Seki, Japón, forja espadas desde el siglo XII. Hoy concentra la mayor parte del cuchillo japonés artesanal e industrial.',
    tag: 'Historia',
  },
  {
    id: 'jf-5',
    title: 'El “thud” del chef profesional',
    body: 'Un chef de línea afila con piedra o varilla casi a diario. El sonido rítmico del acero contra la piedra es el latido de la cocina.',
    tag: 'Cultura',
  },
  {
    id: 'jf-6',
    title: 'Whetstone no significa “piedra mojada”',
    body: 'Whet viene de “hwhet” (afilar) en inglés antiguo — no de wet. Aun así, casi todas las piedras japonesas trabajan mejor mojadas.',
    tag: 'Lenguaje',
  },
  {
    id: 'jf-7',
    title: 'El bisel de 15° existe… a veces',
    body: 'Muchos cuchillos japoneses son mono-bisel o de bisel asimétrico (60/40). Medir con ojo engaña: usa una guía de ángulo.',
    tag: 'Técnica',
  },
  {
    id: 'jf-8',
    title: 'La dureza del tomate prueba el filo',
    body: 'Un tomate maduro tiene piel elástica: solo un filo microscópico entra sin aplastar. Es el test casero más honesto.',
    tag: 'Pruebas',
  },
]

export type NewsItem = {
  slug: string
  title: string
  date: string
  excerpt: string
  tag: string
  body: string[]
}

export const news: NewsItem[] = [
  {
    slug: 'expansion-premium-2026',
    title: 'Knifopics amplía la línea premium con forja damascus',
    date: '2026-09-10',
    excerpt: 'Tres nuevas referencias con 67 capas y núcleo VG-10 llegan al catálogo principal.',
    tag: 'Tienda',
    body: [
      'Knifopics Shop presenta tres nuevas hojas damascus desarrolladas junto a talleres de Seki: chef 21 cm, gyuto 24 cm y petty 15 cm.',
      'Cada pieza lleva núcleo VG-10 con dureza de 60-61 HRC y mango de pakkawood estabilizado. La serie mantiene el lenguaje poligonal de la marca en el empaque y el estuche rígido.',
      'Las unidades de lanzamiento están disponibles por link de MercadoPago único por producto y también en modalidad contra entrega dentro de la Argentina.',
    ],
  },
  {
    slug: 'guia-afilado-wiki',
    title: 'La Wiki estrena manuales de afilado ilustrados',
    date: '2026-08-28',
    excerpt: 'Tres guías paso a paso: piedra de agua, ángulos por tipo de hoja y mantenimiento.',
    tag: 'Wiki',
    body: [
      'Sumamos a /wiki/afilado tres manuales completos pensados para pasar de cero a un filo de papel en una tarde.',
      'Los manuales cubren remojo de piedra, detección de reborde, pulido 6000 y rutina de honing entre sesiones.',
      'Cada guía se complementa con los módulos de la Academia: calculadora de ángulo, quiz y flashcards.',
    ],
  },
  {
    slug: 'academia-del-filo',
    title: 'Academia: la mini app definitiva del nicho cuchillo',
    date: '2026-08-05',
    excerpt: 'Quiz, calculadora, guía interactiva y flashcards — cuatro módulos en un solo lugar.',
    tag: 'Producto',
    body: [
      'Lanzamos /academia: un hub interactivo con cuatro módulos para dominar teoría y práctica del filo.',
      'Identifica cuchillos con el quiz, calcula ángulos y grano según tu acero, sigue la guía de afilado con timer y repasa datos con el simulador de memoria.',
      'Todo funciona offline en el navegador — sin cuentas, sin fricción.',
    ],
  },
  {
    slug: 'care-carbon-steel',
    title: 'Cuidado del acero al carbono: patina, no óxido',
    date: '2026-07-18',
    excerpt: 'Cómo distinguir patina sana de corrosión real y qué hacer en cada caso.',
    tag: 'Cuidado',
    body: [
      'El acero al carbono desarrolla una pátina gris-azulada con el uso: protege y cuenta la historia del cuchillo.',
      'Si aparecen manchas naranjas o textura rugosa, ya es corrosión: ataca con limón y sal suave, enjuaga y seca de inmediato.',
      'La rutina ideal: lavar, secar y gotear aceite mineral alimentario cada pocas semanas si guardas el cuchillo largo tiempo.',
    ],
  },
]

export type WikiSectionId = 'afilado' | 'datos' | 'noticias'

export const wikiSections: { id: WikiSectionId; title: string; description: string; count: number }[] = [
  {
    id: 'afilado',
    title: 'Manuales de afilado',
    description: 'Guías paso a paso para llevar cualquier hoja a filo de papel.',
    count: sharpeningGuides.length,
  },
  {
    id: 'datos',
    title: 'Datos curiosos',
    description: 'Acero, forja, historia y cultura knife en fichas rápidas.',
    count: funFacts.length,
  },
  {
    id: 'noticias',
    title: 'Noticias',
    description: 'Lanzamientos, wiki updates y vida de la marca Knifopics.',
    count: news.length,
  },
]
