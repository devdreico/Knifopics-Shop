import type { ArtKind } from '../components/ui/KnifeArt'

export type GuideStep = { title: string; body: string; tip?: string }

export type Guide = {
  slug: string
  title: string
  excerpt: string
  minutes: number
  level: 'Inicial' | 'Intermedio' | 'Avanzado'
  art?: ArtKind
  steps: GuideStep[]
}

/* ——————————————————————————————————————————
   KNIVES — pasos por cuchillo (guía interactiva por tipo)
   —————————————————————————————————————————— */

export const knifeGuides: Guide[] = [
  {
    slug: 'chef',
    title: 'Chef 21 cm: del corte al filo',
    excerpt:
      'El cuchillo todoterreno. Empuñadura, movimientos, qué cortar y qué nunca — en seis pasos.',
    minutes: 7,
    level: 'Inicial',
    art: 'chef',
    steps: [
      {
        title: 'Dominá la empuñadura de pinza',
        body: 'Pinza el filo entre pulgar e índice directamente sobre el talón, con los otros tres dedos alrededor del mango. Este agarre te da control sobre la punta y evita que el cuchillo gire en cortes largos.',
        tip: 'La presión la pone la hoja, no el puño: empujá, no apretés.',
      },
      {
        title: 'Elegí el movimiento',
        body: 'Para vegetales, rock-chop: punto de apoyo en la punta y arco corto. Para carnes y panes largos, corte largo talón-punta. Para juliana fina, pinza-guía con la mano no dominante',
      },
      {
        title: 'Tajos básicos que tenés que dominar',
        body: 'Mince (brunoise 3 mm), dice (1 cm), juliana (6×6 mm) y corte de rueda para cebolla. Practicá primero en cebolla: es el termómetro honesto de tu técnica.',
        tip: 'Cebolla al 45° y cortes paralelos sin llegar a la raíz = trozos uniformes sin llorar.',
      },
      {
        title: 'Mantenimiento entre usos',
        body: 'Honing con varilla 4–6 veces por lado antes y después de cocinar. Un chef profesional lo hace de memoria: re-centra el filo sin quitar material.',
      },
      {
        title: 'Afilado programado',
        body: 'Piedra 1000 para reposicionar el bisel, 6000 para pulir. 15–20° por lado según el acero. Cada 2–4 semanas en uso doméstico, semanal en cocina profesional.',
      },
      {
        title: 'Los tres errores que matan un chef',
        body: 'Usarlo sobre vidrio o porcelana, dejarlo mojado (manchas y óxido en acero al carbono) y lavarlo en lavavajillas con otros metales.',
      },
    ],
  },
  {
    slug: 'santoku',
    title: 'Santoku: las tres virtudes en acción',
    excerpt: 'Cortar, picar, rallar — el santoku japonés paso a paso con su grind delgado.',
    minutes: 6,
    level: 'Inicial',
    art: 'santoku',
    steps: [
      {
        title: 'Entendé su geometría',
        body: 'Perfil más bajo que el chef, punta redondeada y grind delgado: el santoku brilla en cortes verticales y con vegetales. Las tres virtudes son picar, cortar y rallar.',
      },
      {
        title: 'Corte vertical, sin rocking',
        body: 'El santoku no está pensado para rock-chop. Elevá el talón y bajá la hoja en línea recta: menos fricción, cortes más limpios y cero quemadura en hierbas.',
        tip: 'Su hoja ancha también funciona como pala para levantar lo picado.',
      },
      {
        title: 'Mano guía en garra',
        body: 'Dedos doblados hacia adentro con las uñas como tope. La parte ancha del santoku guía contra los nudillos sin exponer yemas.',
      },
      {
        title: 'Alimentación del grind',
        body: 'Acero AUS-10 o VG-10 pide 15° por lado. Pasá a 16–17° si cortás sobre tabla dura habitualmente.',
      },
      {
        title: 'Cuidado del recubrimiento',
        body: 'Los acabados negros nitro odian el lavavajillas y los abrasivos. Esponja blanda, jabón neutro, secado inmediato y listo.',
      },
      {
        title: 'Cuándo cambiar al chef',
        body: 'Proteínas grandes, squash duro o corte de deshuesado: ahí la hoja del chef y su punta marcan ventaja. El santoku es tu hoja de prep.',
      },
    ],
  },
  {
    slug: 'nakiri',
    title: 'Nakiri: la hoja vegetal recta',
    excerpt: 'Corte perpendicular hasta la tabla, cero balanceo. El spec del cullinario.',
    minutes: 6,
    level: 'Intermedio',
    art: 'nakiri',
    steps: [
      {
        title: 'Recto = corte total',
        body: 'La hoja recta de 17 cm contacta toda la tabla a la vez: no hace falta balancear ni terminar con rocking. Cortá hasta abajo y listo.',
      },
      {
        title: 'Postura de tabla alta',
        body: 'Trabajá con la tabla húmeda o con un repuesto antideslizante. El nakiri pega en la tabla con decisión: necesita base firme.',
      },
      {
        title: 'Técnica push-cut',
        body: 'Empujá hacia adelante mientras bajás: el corte se abre solo. Alterná con pull-cut para tomates blandos y frutas.',
        tip: 'Apilá el vegetal en hileras de dos y cortá dos piezas por pasada.',
      },
      {
        title: 'Qué no va',
        body: 'No es para huesos, panes duros ni frutas con carozo. Es una hoja de vegetales y pescado — el abuso parte el bisel fino.',
      },
      {
        title: 'Filo fino y ángulo corto',
        body: 'Shirogami #2 pide 15° con paciencia: aceros blancos se afilan rápido pero piden secado inmediato. Aceitá el filo si guardás más de una semana.',
      },
      {
        title: 'Flujo de prep profesional',
        body: 'Mise en place con nakiri: primero raíces, después hojas, después frutas — de lo sucio a lo limpio sin cambiar de hoja.',
      },
    ],
  },
  {
    slug: 'paring',
    title: 'Paring 9 cm: el cuchillo de la mano',
    excerpt: 'Mondar, encurtir, relevar — cortes aéreos con control total en la palma.',
    minutes: 5,
    level: 'Inicial',
    art: 'paring',
    steps: [
      {
        title: 'Trabajá en el aire',
        body: 'El pelador está para cortes suspendidos sobre la palma o el pulgar guía: mondar manzanas, hacer ojos de papa, desconchar.',
        tip: 'El movimiento sale del pulgar, no del codo.',
      },
      {
        title: 'Punta primero',
        body: 'Toda la precisión vive en los primeros 3 mm de la punta. Vuelta a tajo corto: punta entera, giro, salida — como un mini cuchillo de deshuesar.',
      },
      {
        title: 'El tajo de avance',
        body: 'Para curvas (remate de rollito, ojo de papa), girá la pieza contra la hoja fija. La hoja no persigue: la pieza se mueve.',
      },
      {
        title: 'Acero que perdona',
        body: 'El 440C a 57–58 HRC aguanta el uso diario y se recupera con varilla. No necesita piedra todos los días — solo después de MUCHO uso.',
      },
      {
        title: 'Jamás sobre tabla',
        body: 'El pelador se usa en la mano, no picando contra tabla. Si necesitás picar chiquito, eso es trabajo del chef o el santoku.',
      },
    ],
  },
  {
    slug: 'bread',
    title: 'Bread ondulado: corteza sin aplastar',
    excerpt: 'Dentado, ángulo y paciencia para trinchar pan artesanal con miga intacta.',
    minutes: 5,
    level: 'Inicial',
    art: 'bread',
    steps: [
      {
        title: 'Dejá el pan reposar',
        body: 'El pan recién horneado tiene miga caliente y flexible: esperá al menos 40 minutos. La corteza se asienta y el dentado muerde sin desgarrar.',
      },
      {
        title: 'Movimiento de sierra, sin presión',
        body: 'Dejá que los dientes trabajen con un vaivén largo. Apretar aplasta la miga; el dentado está diseñado para morder tirando.',
        tip: 'Si el cuchillo patina, el dentado pide piedra específica — no lo afiles con grano liso.',
      },
      {
        title: 'Ángulo alto y corte de rueda',
        body: 'Entrá con la punta a 45° y bajá en arco. Para baguettes, empezá en el centro con una punzada y completá hacia los extremos.',
      },
      {
        title: 'Ancho de rebanada',
        body: '2 cm para pan de molde, 3–4 cm para campo. Rebanadas irregulares se queman en la tostadora — la constancia es medio filo, medio pulso.',
      },
      {
        title: 'Limpieza del dentado',
        body: 'Jabón neutro y esponja blanda siguiendo la forma de los dientes. Nunca en lavavajillas: el detallado del dentado es el primer enemigo del esmalte.',
      },
    ],
  },
  {
    slug: 'cleaver',
    title: 'Cleaver carbon: masa con propósito',
    excerpt: 'Corte perpendicular, hueso chico y carbon steel que hay que saber cuidar.',
    minutes: 7,
    level: 'Avanzado',
    art: 'cleaver',
    steps: [
      {
        title: 'Gravedad a tu favor',
        body: 'El cleaver corta por peso, no por presión. Elevá y dejá caer con control: vos dirigís el destino, la gravedad pone la fuerza.',
      },
      {
        title: 'Palo vs. corte vegetal',
        body: 'Golpeá con el centro del filo sobre palos y huesos pequeños; usá los extremos para cortar vegetales grandes (zapallo, col) en una sola caída.',
        tip: 'Nunca uses el canto trasero como martillo: grietas el grosor de 2,4 mm.',
      },
      {
        title: 'Postura y distancia',
        body: 'Pies separados al ancho de hombros, tabla a la altura de la cadera. La hoja ancha también sirve para trasladar picado — como pala gigante.',
      },
      {
        title: 'Vida del carbon steel',
        body: 'La pátina gris-azulada es tu escudo: se forma sola. Si aparece naranja (óxido), limón + sal, enjuague, seque y encape con aceite.',
      },
      {
        title: 'Ritual de aceite',
        body: 'Tras cada lavado: secado al fuego o paño y una gota de aceite distribuida con papel. Cinco segundos que le suman años.',
      },
      {
        title: 'Bisel ancho para impacto',
        body: '20–22° por lado. Un bisel más fino se astilla contra hueso; el cleaver pide robustez antes que finura.',
      },
    ],
  },
  {
    slug: 'steak',
    title: 'Steak Mistral: el cuchillo de mesa',
    excerpt: 'Cortar bistec sin tirar de la carne: técnica de mesa, bisel y etiqueta.',
    minutes: 4,
    level: 'Inicial',
    art: 'steak',
    steps: [
      {
        title: 'Test del bistec',
        body: 'Un steak cortado con buen filo se abre sin tironear. Si la carne se deforma, el bistec perdió jugos — y la mesa perdió el punto.',
      },
      {
        title: 'Corte corto y decidido',
        body: 'Pieza fija con el tenedor, corte de 3–4 cm con el borde del filo, sin sierra de vaivén. Cortá del borde al centro y descansá el cuchillo.',
        tip: 'Cortá contra la fibra: menos masticación, más jugo.',
      },
      {
        title: 'El bisel de 18°',
        body: 'Suficientemente filoso para carne a la parrilla, suficientemente resistente para el choque con plato. Piedra 4000–6000 después de cada cena larga.',
      },
      {
        title: 'Cuidado post-mesa',
        body: 'Lavado inmediato a mano — las salsas con sal y ácido marcan el acero. Secado con paño suave para no arañar el acabado espejo del set.',
      },
      {
        title: 'Etiqueta del set',
        body: 'Cuatro piezas, cuatro comensales: cada steak vive en su lugar del estuche. Almacenar suelto es como guardar cubierta de plata en un cajón.',
      },
    ],
  },
]

/* ——————————————————————————————————————————
   KITCHEN — guías de cocina
   —————————————————————————————————————————— */

export const kitchenGuides: Guide[] = [
  {
    slug: 'hierro-fundido',
    title: 'Hierro fundido: primer uso, curado y rescate',
    excerpt: 'De la sartén nueva a la pátina negra: cómo curar, usar y recuperar hierro.',
    minutes: 8,
    level: 'Inicial',
    art: 'pan',
    steps: [
      {
        title: 'Primer lavado (el único con jabón)',
        body: 'Lavá la pieza nueva con agua tibia y una gota de jabón neutro para retirar la capa de protección industrial. Secá inmediatamente al fuego.',
      },
      {
        title: 'Curado en capas',
        body: 'Aplicá una película finísima de aceite vegetal con papel y horneá 1 hora a 230 °C. Repetí 3 veces. El aceite polimeriza: nace la capa antiadherente.',
        tip: 'Menos es más: capa gruesa = superficie pegajosa.',
      },
      {
        title: 'Fuego alto, grasa suficiente',
        body: 'El hierro prefiere calentarse gradual y con grasa. Aceite o manteca antes de la comida: es lo que pule la pátina con cada cocción.',
      },
      {
        title: 'Lavado sin miedo',
        body: 'Agua caliente y cepillo mientras está tibia. Si quedaron restos, sal gruesa con un trapo. Jabón ocasional no rompe el curado maduro.',
      },
      {
        title: 'Secar y encapar siempre',
        body: 'Pasá por el fuego hasta que evapore toda la humedad, baja a cero y una gota de aceite frotada. Este paso es la vida del hierro.',
      },
      {
        title: 'Rescate de óxido',
        body: 'Óxido naranja = cortar con vinagre o limón y sal, enjuagar, secar al fuego y recurar. La pátina gris oscura es sana: no la toques.',
      },
    ],
  },
  {
    slug: 'wok-fuego-vivo',
    title: 'Wok: temperatura, orden y wok hei',
    excerpt: 'El stir-fry profesional en casa: Mise en place, humo correcto y orden de cocción.',
    minutes: 7,
    level: 'Intermedio',
    art: 'wok',
    steps: [
      {
        title: 'Mise en place total',
        body: 'El wok no espera: todo cortado, marinado y medido ANTES de prender fuego. Cocción real de 4–6 minutos por tanda. Prepará 6 platos y cociná 1.',
      },
      {
        title: 'Calentá hasta humear',
        body: 'Fuego máximo hasta que el acero humee (230 °C+). Recién ahí va el aceite, girá para capar las paredes y bajá a fuego medio-alto.',
        tip: 'El wok frío = vapor en vez de sellado. Paciencia con el calor.',
      },
      {
        title: 'Orden por densidad',
        body: 'Proteínas primero (sacar), después raíces, después hojas, y salsa al final. Cada tanda con espacio: si amontonás, hierve en vez de dorar.',
      },
      {
        title: 'El wok hei',
        body: 'El aroma ahumado nace cuando el aceite alcanza el punto de combustión en las paredes. Fuego fuerte, movimientos rápidos, piezas chicas — eso es wok hei.',
      },
      {
        title: 'Encapado permanente',
        body: 'Tras cada uso: sal y trapo sobre fuego, secado total y film de aceite. El carbono se prenda solo — no lo sabones.',
      },
      {
        title: 'Fogón en casa',
        body: 'Sin quemador de restaurant: tanda chica, wok bien seco previo y una sola capa de comida. Mitad de la potencia, el doble de paciencia.',
      },
    ],
  },
  {
    slug: 'coccion-lenta',
    title: 'Cocción lenta en Dutch oven',
    excerpt: 'Guisos, panes y confitados: el método bajo fuego que no falla.',
    minutes: 6,
    level: 'Intermedio',
    art: 'dutch',
    steps: [
      {
        title: 'Sellado en tandas',
        body: 'La carne va en porciones con espacio: si apilás, hierve en su jugo. Dorá de ambos lados, sacá y seguí con la próxima tanda.',
      },
      {
        title: 'Deglasar siempre',
        body: 'El fondo adherido es sabor concentrado. Vino, caldo o agua tras la carne: raspá con cuchara de madera mientras burbujea.',
      },
      {
        title: 'Líquido hasta dos tercios',
        body: 'Nunca llenar: el vapor necesita espacio para condensar en la tapa y devolver humedad. Ahí está el truco del guiso jugoso.',
      },
      {
        title: 'Temperatura pareja',
        body: '140–160 °C en horno, o fuego mínimo en cocinas. El hierro acumula y reparte calor sin picos: la carne no se asusta.',
        tip: 'Tapa puesta = condensación = tu guiso se basta solo.',
      },
      {
        title: 'Tiempo sin abrir',
        body: 'Las primeras 2 horas no se levanta la tapa. Cada apertura suma 15 minutos de recuperación térmica.',
      },
      {
        title: 'Panes en olla',
        body: 'Precalentá la olla vacía, meté la masa con tapa a 240 °C, 25 min tapada + 15 sin tapa. Corteza como de panadería, con vapor propio.',
      },
    ],
  },
  {
    slug: 'mise-en-place',
    title: 'Mise en place: la cocina que no corre',
    excerpt: 'Organización de estación, orden de trabajo y flujos que multiplican tu velocidad.',
    minutes: 5,
    level: 'Inicial',
    steps: [
      {
        title: 'Escribí antes de cortar',
        body: 'Leé la receta completa, listá ingredientes y utensilios. Diez minutos de lectura evitan el pánico del paso 7 con el sartén humeando.',
      },
      {
        title: 'Grupos por momento',
        body: 'Agrupá por tiempo de uso: lo que va primero junto al fogón, lo que espera en la penúltima fila. Nada cruza la cocina en plena cocción.',
      },
      {
        title: 'Contenedores iguales',
        body: 'Bowls del mismo tamaño se apilan, se miden y se ordenan. Mise sin desorden: la simetría ahorra segundos que se acumulan.',
        tip: 'Una bandeja grande = tu estación móvil. Todo dentro, al fuego.',
      },
      {
        title: 'Medí, no estimes',
        body: 'Balanza y cucharas antes de prender. La repostería es química y la sal más el azúcar no se arregla en la mesa.',
      },
      {
        title: 'Limpia mientras cocinás',
        body: 'Un espacio de lavado dedicado durante la prep: cada plato usado a la pileta al terminar su tarea. Al servicio, la estación queda limpia.',
      },
      {
        title: 'Cierre de estación',
        body: 'Refrigere lo perecedero, etiquete lo procesado, cepille lo usado. El mañana te lo va a agradecer a las 7 a.m.',
      },
    ],
  },
  {
    slug: 'puntos-coccion',
    title: 'Puntos de cocción con termómetro',
    excerpt: 'De rare a well: temperaturas exactas, reposo y dónde medir de verdad.',
    minutes: 5,
    level: 'Inicial',
    art: 'thermo',
    steps: [
      {
        title: 'Dónde clavar la sonda',
        body: 'En el centro de la pieza, sin tocar hueso ni grasa exterior: ahí la lectura es real. Dos puntos por pieza grande para promediar.',
      },
      {
        title: 'La tabla de la verdad',
        body: 'Res 52 °C, medium-rare 57 °C, medium 63 °C, well 71 °C para carne vacuna. Pollo 74 °C, cerdo 63 °C con 3 min de reposo.',
        tip: 'Más cocción de la necesaria no es más seguro — es más seco.',
      },
      {
        title: 'Sacá 3 °C antes',
        body: 'El calor sigue subiendo en reposo (carryover). Sacá la pieza 3–4 °C por debajo del objetivo y tapá con foil suelto.',
      },
      {
        title: 'Reposo obligatorio',
        body: 'Bistec 5–8 min, asado 15–30 min. Cortarlo caliente es desparramar jugo en la tabla — el reposo reabsorbe.',
      },
      {
        title: 'Aceite de fritura',
        body: 'La sonda sirve también para aceite: 170–180 °C para dorado. Más bajo = grasa absorbida; más alto = humo y amargor.',
      },
      {
        title: 'Cheat sheet en la heladera',
        body: 'Pegá la tabla con imán. Dos semanas y los números se hacen musculares — el termómetro pasa a confirmar, no a decidir.',
      },
    ],
  },
  {
    slug: 'reposteria-precision',
    title: 'Repostería de precisión: gramos, tiempo, temperatura',
    excerpt: 'Balanza, fermentación y constantes: por qué la repostería no perdona estimaciones.',
    minutes: 6,
    level: 'Intermedio',
    art: 'scale',
    steps: [
      {
        title: 'Todo en gramos',
        body: 'Tazas de harina varían hasta 20 % según el llenado. La balanza elimina la variable número uno de las masas que fallan.',
        tip: 'Pesá directo en el bowl: un tara y cero trasvasos.',
      },
      {
        title: 'Orden de incorporación',
        body: 'Secos juntos, líquidos juntos, grasa antes que huevo. La mezcla en dos tiempos controla el gluten: menos amasado, miga más tierna.',
      },
      {
        title: 'Temperatura de ingredientes',
        body: 'Manteca en punto pomada (20 °C), huevos a temperatura, leche tibia para levadura. Frío extremo = fermentación muerta; calor = grasa derretida.',
      },
      {
        title: 'Fermentación por tiempo y volumen',
        body: 'La levadura no mira el reloj, mira el volumen: doble tamaño es la señal. En cocina fría el doble puede tardar 90 min — paciencia, no azúcar extra.',
      },
      {
        title: 'Horno calibrado',
        body: 'Los hornos domésticos mienten hasta 15 °C. Comprá un termómetro de horno y ajustá la perilla: tu receta asume 180 °C reales.',
      },
      {
        title: 'Anote y repita',
        body: 'Qué marca de harina, qué temperatura, cuánto subió. La repostería es reproducibilidad: sin registro no hay mejora.',
      },
    ],
  },
]

export function getGuide(slug: string): { guide: Guide; section: 'knifes' | 'kitchen' } | undefined {
  const knife = knifeGuides.find((g) => g.slug === slug)
  if (knife) return { guide: knife, section: 'knifes' }
  const k = kitchenGuides.find((g) => g.slug === slug)
  if (k) return { guide: k, section: 'kitchen' }
  return undefined
}
