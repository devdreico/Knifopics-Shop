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

export const cultures: Culture[] = [
  {
    slug: 'japon',
    name: 'Japón',
    region: 'Asia oriental',
    tagline: 'Producto de temporada, corte preciso, caldo limpio',
    description:
      'La cocina japonesa eleva la precisión a disciplina: el corte define el sabor, el caldo define la base y la estación define el menú. Del kaiseki al ramen de barrio, todo depende de ingredientes tratados con respeto y de hojas de trabajo impecables.',
    dishes: [
      { name: 'Sushi & sashimi', note: 'Arroz a temperatura corporal, corte de pescado en un solo gesto.' },
      { name: 'Ramen', note: 'Caldo de horas, fideos al dente y toppings cortados a mano.' },
      { name: 'Tempura', note: 'Rebozado helado sobre aceite a temperatura exacta.' },
      { name: 'Katsu curry', note: 'Empanado crocante y curry de casa espesado lento.' },
    ],
    essentials: [
      { name: 'Santoku de filo fino', productSlug: 'santoku-nero-18' },
      { name: 'Wok de carbon para wok hei', productSlug: 'wok-carbon-30' },
      { name: 'Termómetro de sonda', productSlug: 'termometro-sonda' },
    ],
    tip: 'Regla japonesa: si el cuchillo no entra solo, el corte es demasiado grande para el plato.',
  },
  {
    slug: 'italia',
    name: 'Italia',
    region: 'Europa meridional',
    tagline: 'Pocos ingredientes, ejecución perfecta',
    description:
      'La cocina italiana es un ejercicio de edicción: aceite de oliva bueno, tomate de temporada y pasta cocida al dente. La región manda — Nápoles, Bolonia, Sicilia — y la receta familiar pesa más que cualquier manual.',
    dishes: [
      { name: 'Pasta al dente', note: 'Agua de mar, sal al momento, un minuto menos del paquete.' },
      { name: 'Risotto', note: 'Caldo caliente añadido cucharada a cucharada, manteca al final.' },
      { name: 'Pizza napolitana', note: 'Masa de 24 h, horno a 450 °C, 90 segundos.' },
      { name: 'Ribollita', note: 'Sopa de pan viejo que mejora al día siguiente.' },
    ],
    essentials: [
      { name: 'Olla inoxidable para pasta', productSlug: 'olla-inox-5l' },
      { name: 'Tabla de roble para masa', productSlug: 'tabla-roble-poligonal' },
      { name: 'Set de utensilios de madera', productSlug: 'set-utensilios-roble' },
    ],
    tip: 'El agua de pasta hierve primero: la sal cuando rompe el chorro, nunca antes.',
  },
  {
    slug: 'mexico',
    name: 'México',
    region: 'América del Norte',
    tagline: 'Maíz, chile y técnica ancestral',
    description:
      'Patrimonio de la humanidad en la Olla de Barro al mole: cocción de nixtamalización, tostado de chiles y salsas molidas a mano. El fuego bajo y el comal son el corazón de una cocina que convierte lo simple en complejo.',
    dishes: [
      { name: 'Tacos al carbón', note: 'Tortilla recién hecha, carne sellada al punto, cebolla y cilantro.' },
      { name: 'Mole poblano', note: 'Veinte ingredientes tostados, molidos y cocidos por horas.' },
      { name: 'Pozole', note: 'Maíz cacahuazintle, caldo de cerdo y garnish crujiente.' },
      { name: 'Tamales', note: 'Masa de masa, relleno y envoltura de hoja al vapor.' },
    ],
    essentials: [
      { name: 'Sartén de hierro fundido', productSlug: 'sarten-hierro-26' },
      { name: 'Molinillo de especias', productSlug: 'molinillo-pimienta' },
      { name: 'Batidor para salsas', productSlug: 'batidor-balloon' },
    ],
    tip: 'Tuesta los chiles en seco a fuego medio hasta que huelan: nunca los quemes — se vuelven amargos.',
  },
  {
    slug: 'francia',
    name: 'Francia',
    region: 'Europa occidental',
    tagline: 'Salsas madre, mantequilla y fuego lento',
    description:
      'La madre de la cocina clásica: salsas que dan origen a decenas de derivadas, confitados, estofados en hierro y panadería de precisión. Francia convirtió la técnica en método — y el método en cultura.',
    dishes: [
      { name: 'Bœuf bourguignon', note: 'Carne sellada, vino tinto y guiso lento en Dutch oven.' },
      { name: 'Soupe à l’oignon', note: 'Cebolla caramelizada 40 minutos y gruyère gratinado.' },
      { name: 'Crème brûlée', note: 'Vainilla infundida y costra de azúcar quemada al momento.' },
      { name: 'Baguette', note: 'Harina, agua, sal, levadura — y vapor en el horno.' },
    ],
    essentials: [
      { name: 'Dutch oven esmaltada', productSlug: 'dutch-oven-55' },
      { name: 'Batidor profesional', productSlug: 'batidor-balloon' },
      { name: 'Balanza de precisión', productSlug: 'balanza-digital-5kg' },
    ],
    tip: 'Cinco salsas madre, infinitas variantes: bechamel, velouté, espagnole, hollandaise y tomate.',
  },
  {
    slug: 'argentina',
    name: 'Argentina',
    region: 'Cono Sur',
    tagline: 'Fuego, carne y tiempo',
    description:
      'La cocina argentina gira alrededor del fuego: el asado es ritual, no receta. Cortes sencillos, sal gruesa, brasa estable y la paciencia del asador que espera el punto exacto. El resto — empanadas, pasta, dulce de leche — es herencia que acompaña.',
    dishes: [
      { name: 'Asado de tira', note: 'Sal grueso, brasa media, giro único por pieza.' },
      { name: 'Provoleta', note: 'Queso a la brasa con orégano y aceitunas.' },
      { name: 'Empanadas de carne', note: 'Repulgue a mano, jugo tardo y pimentón.' },
      { name: 'Chimichurri', note: 'Perejil, ajo, orégano y aceite — nunca cocción.' },
    ],
    essentials: [
      { name: 'Cleaver de carbon para corte', productSlug: 'cleaver-carbon-20' },
      { name: 'Sartén de hierro para provoleta', productSlug: 'sarten-hierro-26' },
      { name: 'Tabla de corte robusta', productSlug: 'tabla-roble-poligonal' },
    ],
    tip: 'El punto del asado se escucha: cuando el jugo canta fuerte, falta; cuando susurra, está listo.',
  },
  {
    slug: 'peru',
    name: 'Perú',
    region: 'Pacífico sur',
    tagline: 'Fusión, acidulante y variedad andina',
    description:
      'Ceviche con leche de tigre, wok chino-peruano y 3000 variedades de papa: la cocina peruana es la fusión más exitosa del continente. El corte fino, la acidez precisa y el fuego alto del chifa la definen.',
    dishes: [
      { name: 'Ceviche', note: 'Pescado fresco, limón y ají — minutos, no horas.' },
      { name: 'Lomo saltado', note: 'Salteado en wok humeante con cebolla y tomate.' },
      { name: 'Ají de gallina', note: 'Salsa de ají amarillo, galleta y leche.' },
      { name: 'Causa limeña', note: 'Papa amarilla fría, relleno y limón.' },
    ],
    essentials: [
      { name: 'Wok de 30 cm', productSlug: 'wok-carbon-30' },
      { name: 'Cuchillo chef para corte fino', productSlug: 'chef-damascus-21' },
      { name: 'Termómetro para sartén', productSlug: 'termometro-sonda' },
    ],
    tip: 'El lomo saltado pide wok a full y tandas chicas: si apilás carne, se hierve en vez de sellar.',
  },
]

export function getCulture(slug: string) {
  return cultures.find((c) => c.slug === slug)
}
