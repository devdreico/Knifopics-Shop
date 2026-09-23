import type { ArtKind } from '../components/ui/KnifeArt'

export type Category = 'knifes' | 'cocina'

export type Product = {
  slug: string
  name: string
  category: Category
  price: number
  short: string
  description: string
  art: ArtKind
  tone: 'blade' | 'dark' | 'gold' | 'wood' | 'stone'
  tag?: string
  steel?: string
  length?: string
  hardness?: string
  weight?: string
  origin?: string
  care?: string
  /** Unique MercadoPago payment link for this product */
  mpLink: string
  specs: { label: string; value: string }[]
}

export const products: Product[] = [
  {
    slug: 'chef-damascus-21',
    name: 'Chef Damascus 21 cm',
    category: 'knifes',
    price: 189999,
    short: 'Acero damascus 67 capas, núcleo VG-10 y filo espejo.',
    description:
      'El buque insignia de Knifopics. Hoja de acero damascus con 67 capas forjadas alrededor de un núcleo VG-10, mango de pakkawood y balance perfecto en el talón. Corte de precisión para cocina profesional y aficionados exigentes.',
    art: 'chef',
    tone: 'gold',
    tag: 'Top ventas',
    steel: 'Damascus 67L / VG-10',
    length: '21 cm',
    hardness: '60-61 HRC',
    weight: '198 g',
    origin: 'Seki, Japón',
    care: 'Lavar a mano, secar de inmediato, guardar en soporte.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-chef-damascus',
    specs: [
      { label: 'Acero', value: 'Damascus 67 capas (VG-10)' },
      { label: 'Largo de hoja', value: '21 cm' },
      { label: 'Dureza', value: '60-61 HRC' },
      { label: 'Mango', value: 'Pakkawood' },
      { label: 'Peso', value: '198 g' },
      { label: 'Ángulo de filo', value: '15° por lado' },
    ],
  },
  {
    slug: 'santoku-nero-18',
    name: 'Santoku Nero 18 cm',
    category: 'knifes',
    price: 149999,
    short: 'Geometría tres virtudes con acabado negro nitro.',
    description:
      'Santoku de perfil clásico japonés con acabado negro nitro sobre acero AUS-10. Ideal para vegetales, pescado y cortes finos. El grind delgado permite un deslizamiento casi sin fricción.',
    art: 'santoku',
    tone: 'dark',
    tag: 'Nuevo',
    steel: 'AUS-10 con recubrimiento nitro',
    length: '18 cm',
    hardness: '59-60 HRC',
    weight: '165 g',
    origin: 'Seki, Japón',
    care: 'Lavar a mano, secar de inmediato.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-santoku-nero',
    specs: [
      { label: 'Acero', value: 'AUS-10 nitro coat' },
      { label: 'Largo de hoja', value: '18 cm' },
      { label: 'Dureza', value: '59-60 HRC' },
      { label: 'Mango', value: 'Fibra negra' },
      { label: 'Peso', value: '165 g' },
      { label: 'Perfil', value: 'Santoku (3 virtudes)' },
    ],
  },
  {
    slug: 'nakiri-vegetal-17',
    name: 'Nakiri Vegetal 17 cm',
    category: 'knifes',
    price: 129999,
    short: 'Cuchillo vegetal recto de corte perpendicular limpio.',
    description:
      'Hoja recta y alta diseñada para el cullinario vegetal: corta hasta la tabla sin balancear. Acero multicapa con núcleo de alta dureza y mango octogonal que evita el giro en la mano húmeda.',
    art: 'nakiri',
    tone: 'blade',
    steel: 'Shirogami #2 multicapa',
    length: '17 cm',
    hardness: '61-62 HRC',
    weight: '175 g',
    origin: 'Seki, Japón',
    care: 'Lavar a mano, secar, aceitar ocasionalmente el filo.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-nakiri',
    specs: [
      { label: 'Acero', value: 'Shirogami #2 multicapa' },
      { label: 'Largo de hoja', value: '17 cm' },
      { label: 'Dureza', value: '61-62 HRC' },
      { label: 'Mango', value: 'Octagonal wood' },
      { label: 'Peso', value: '175 g' },
      { label: 'Uso', value: 'Vegetales / herbáceos' },
    ],
  },
  {
    slug: 'paring-essentials-9',
    name: 'Paring Essentials 9 cm',
    category: 'knifes',
    price: 69999,
    short: 'El pelador preciso para retoques, mondar y brunoise.',
    description:
      'Cuchillo de pelar de 9 cm con punta agresiva y control total. Acero 440C tratado a 58 HRC: aguanta el uso diario sin pedir afilado constante. El companion perfecto del chef.',
    art: 'paring',
    tone: 'blade',
    steel: '440C',
    length: '9 cm',
    hardness: '57-58 HRC',
    weight: '72 g',
    origin: 'España',
    care: 'Lavar a mano y secar.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-paring',
    specs: [
      { label: 'Acero', value: '440C' },
      { label: 'Largo de hoja', value: '9 cm' },
      { label: 'Dureza', value: '57-58 HRC' },
      { label: 'Mango', value: 'Micarta' },
      { label: 'Peso', value: '72 g' },
      { label: 'Uso', value: 'Pelar / detalle' },
    ],
  },
  {
    slug: 'bread-ondulado-26',
    name: 'Bread Ondulado 26 cm',
    category: 'knifes',
    price: 99999,
    short: 'Dentado agresivo que muerde corteza sin aplastar miga.',
    description:
      'Cuchillo de pan de 26 cm con dentado ondulado de paso largo. Trincha crust artesanal y baguettes sin comprimir la miga. Acero inoxidable con mango atrapado y pomo equilibrado.',
    art: 'bread',
    tone: 'blade',
    steel: 'Inoxidable X50CrMoV15',
    length: '26 cm',
    hardness: '56 HRC',
    weight: '185 g',
    origin: 'Alemania',
    care: 'Lavar a mano; el dentado se afila con piedra específica.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-bread',
    specs: [
      { label: 'Acero', value: 'X50CrMoV15' },
      { label: 'Largo de hoja', value: '26 cm' },
      { label: 'Dureza', value: '56 HRC' },
      { label: 'Mango', value: 'Sintético atrapado' },
      { label: 'Peso', value: '185 g' },
      { label: 'Dentado', value: 'Ondulado paso largo' },
    ],
  },
  {
    slug: 'cleaver-carbon-20',
    name: 'Cleaver Carbon 20 cm',
    category: 'knifes',
    price: 159999,
    short: 'Carbon steel con patina que cuenta tu historia.',
    description:
      'Cleaver de acero al carbono con espesor de 2,4 mm y filo convexo. Rompe huesos pequeños y porciones con aplomo. Desarrolla patina protectora con el uso — un cuchillo que envejece contigo.',
    art: 'cleaver',
    tone: 'dark',
    tag: 'Edición forja',
    steel: 'Carbon steel 1095',
    length: '20 cm',
    hardness: '58-59 HRC',
    weight: '420 g',
    origin: 'China',
    care: 'Secar y aceitar tras cada uso (evita óxido).',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-cleaver',
    specs: [
      { label: 'Acero', value: '1095 carbon' },
      { label: 'Largo de hoja', value: '20 cm' },
      { label: 'Dureza', value: '58-59 HRC' },
      { label: 'Mango', value: 'Roble ahumado' },
      { label: 'Peso', value: '420 g' },
      { label: 'Espesor', value: '2.4 mm' },
    ],
  },
  {
    slug: 'set-steak-mistral-x4',
    name: 'Set Steak Mistral ×4',
    category: 'knifes',
    price: 119999,
    short: 'Cuatro steak de mesa con diseño poligonal facetado.',
    description:
      'Set de cuatro cuchillos de carne de mesa. Hojas espejo y mangos facetados que rinden homenaje al logo Knifopics. Presentados en estuche rígido — la mesa como showcase.',
    art: 'steak',
    tone: 'gold',
    tag: 'Set',
    steel: 'Inoxidable 14C28N',
    length: '12 cm',
    hardness: '58-59 HRC',
    weight: '4 × 95 g',
    origin: 'Suecia',
    care: 'Lavar a mano, secar con paño suave.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-steak',
    specs: [
      { label: 'Acero', value: '14C28N' },
      { label: 'Largo de hoja', value: '12 cm' },
      { label: 'Dureza', value: '58-59 HRC' },
      { label: 'Unidades', value: '4 cuchillos' },
      { label: 'Peso c/u', value: '95 g' },
      { label: 'Presentación', value: 'Estuche rígido' },
    ],
  },
  {
    slug: 'tabla-roble-poligonal',
    name: 'Tabla Corte Roble Poligonal',
    category: 'cocina',
    price: 79999,
    short: 'Roble macizo con silueta facetada y canal de jugos.',
    description:
      'Tabla de corte de roble europeo macizo, perfil poligonal y canal perimetral. Tratada con aceite mineral apto alimentos. El complemento natural de cualquier hoja premium.',
    art: 'board',
    tone: 'wood',
    steel: 'Roble europeo',
    length: '45 × 30 cm',
    weight: '1.9 kg',
    origin: 'España',
    care: 'Lavar a mano, secar vertical, reaceitar mensual.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-board',
    specs: [
      { label: 'Material', value: 'Roble europeo macizo' },
      { label: 'Medidas', value: '45 × 30 × 4 cm' },
      { label: 'Peso', value: '1.9 kg' },
      { label: 'Acabado', value: 'Aceite mineral alimentario' },
      { label: 'Canal', value: 'Perimetral antidesborde' },
      { label: 'Perfil', value: 'Poligonal facetado' },
    ],
  },
  {
    slug: 'whetstone-1000-6000',
    name: 'Whetstone 1000 / 6000',
    category: 'cocina',
    price: 89999,
    short: 'Piedra doble cara con base antideslizante.',
    description:
      'Piedra de agua de doble cara: 1000 grit para refilado y 6000 para pulido espejo. Incluye base de goma y guía de ángulo introductoria. El ritual del afilado empieza aquí.',
    art: 'whetstone',
    tone: 'stone',
    tag: 'Esencial',
    steel: 'Corindón blanco',
    length: '18 × 6 × 3 cm',
    weight: '780 g',
    origin: 'Japón',
    care: 'Remojar 5-10 min antes de usar; secar al aire.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-whetstone',
    specs: [
      { label: 'Grits', value: '1000 / 6000' },
      { label: 'Tipo', value: 'Piedra de agua' },
      { label: 'Medidas', value: '18 × 6 × 3 cm' },
      { label: 'Peso', value: '780 g' },
      { label: 'Incluye', value: 'Base antideslizante' },
      { label: 'Uso', value: 'Refilado + pulido' },
    ],
  },
  {
    slug: 'guardacuchillos-bunker',
    name: 'Guardacuchillos Bunker',
    category: 'cocina',
    price: 59999,
    short: 'Bloque poligonal con ranuras modulares para 8 piezas.',
    description:
      'Bloque de almacenamiento con ranuras escalonadas para hasta 8 cuchillos y ranura para la piedra. Estructura de madera oscura con insertos metálicos — protege el filo y exhibe tu set.',
    art: 'block',
    tone: 'dark',
    steel: 'Nogal + acero',
    length: '24 × 18 × 28 cm',
    weight: '2.4 kg',
    origin: 'España',
    care: 'Limpiar con paño seco; no sumergir.',
    mpLink: 'https://www.mercadopago.com.ar/checkout/v1/placeholder-block',
    specs: [
      { label: 'Capacidad', value: '8 cuchillos + piedra' },
      { label: 'Material', value: 'Nogal + insertos acero' },
      { label: 'Medidas', value: '24 × 18 × 28 cm' },
      { label: 'Peso', value: '2.4 kg' },
      { label: 'Ranuras', value: 'Escalonadas modulares' },
      { label: 'Estilo', value: 'Poligonal premium' },
    ],
  },
]

export const knifes = products.filter((p) => p.category === 'knifes')
export const cocina = products.filter((p) => p.category === 'cocina')

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}
