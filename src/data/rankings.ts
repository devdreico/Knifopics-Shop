export type RankingItem = {
  rank: number
  name: string
  desc: string
  meta?: string
}

export type Ranking = {
  id: string
  title: string
  subtitle: string
  tag: string
  items: RankingItem[]
}

export const rankings: Ranking[] = [
  {
    id: 'top-sartenes-2026',
    title: 'Top 10 sartenes del 2026',
    subtitle: 'El ranking que arman los chefs cuando alguien pregunta «¿con qué sartén empiezo?».',
    tag: 'Ranking · Cocina',
    items: [
      { rank: 1, name: 'Hierro fundido', desc: 'Retención de calor, sellado perfecto y vida útil multigeneracional. El estándar contra el que todo se mide.', meta: 'Para siempre' },
      { rank: 2, name: 'Carbon steel wok', desc: 'Calienta rápido, pesa poco y desarrolla wok hei en casa. El más versátil por gramo.', meta: 'Fuego vivo' },
      { rank: 3, name: 'Acero inoxidable triple capa', desc: 'No reacciona con ácidos, se puede lavar con jabón y va al lavavajillas. El caballo de batalla.', meta: 'A todos los fuegos' },
      { rank: 4, name: 'Dutch oven esmaltada', desc: 'Sellar, tapar, horno: guisos, pan y confitados en una sola pieza.', meta: 'Bajo fuego' },
      { rank: 5, name: 'Cerámica antiadherente de calidad', desc: 'Para huevos y pescados delicados cuando la velocidad importa más que el sello.', meta: 'Delicados' },
      { rank: 6, name: 'Aluminio anodizado', desc: 'Ligera, reactiva al calor y económica: la primera sartén de muchos cocineros.', meta: 'Ligera' },
      { rank: 7, name: 'Cobre recubierto', desc: 'Respuesta térmica instantánea para salsas y caramelo. Belleza y precisión con precio.', meta: 'Precisión' },
      { rank: 8, name: 'Cast iron grill', desc: 'Rayas de parrilla y drenaje de grasa: la parrilla indoor que sí sella.', meta: 'Parrilla' },
      { rank: 9, name: 'Granito / piedra volcánica', desc: 'Antiadherente natural sin PTFE, resistente a utensilios de metal.', meta: 'Sin PTFE' },
      { rank: 10, name: 'Antiadherente clásico', desc: 'Cómodo y barato, pero con vida útil limitada: reemplazable cada pocos años.', meta: 'De entrada' },
    ],
  },
  {
    id: 'cocinas-del-mundo',
    title: 'Las 10 cocinas del mundo por influencia',
    subtitle: 'Método, alcance y peso en los platos que el planeta come hoy.',
    tag: 'Ranking · Cultura',
    items: [
      { rank: 1, name: 'Francia', desc: 'Canonizó el método: salsas madre, técnica clásica y el lenguaje que toda cocina profesional habla.', meta: 'Método' },
      { rank: 2, name: 'Italia', desc: 'La edicción perfecta: producto de temporada y recetas familiares que viajan intactas.', meta: 'Producto' },
      { rank: 3, name: 'Japón', desc: 'Precisión y estacionalidad al extremo: del corte del sashimi al balance del umami.', meta: 'Precisión' },
      { rank: 4, name: 'México', desc: 'Patrimonio vivo: nixtamalización, chiles tostados y moles de complejidad inigualable.', meta: 'Herencia' },
      { rank: 5, name: 'China', desc: 'Mil técnicas de fuego: wok hei, cocción por vapor y regionalidad infinita.', meta: 'Fuego' },
      { rank: 6, name: 'Perú', desc: 'Fusión criolla, nikkei y chifa con ingredientes andinos únicos en el mundo.', meta: 'Fusión' },
      { rank: 7, name: 'India', desc: 'Especias como sistema: mezclas tostadas, mojadas y capas de sabor sin parangón.', meta: 'Especias' },
      { rank: 8, name: 'Levante / Oriente Medio', desc: 'Granos, legumbres y punto de grano: el meze y el horno de barro como escuela.', meta: 'Compartir' },
      { rank: 9, name: 'España', desc: 'Del sofrito al paella: fuego, arroces y la barra como institución cultural.', meta: 'Brasa' },
      { rank: 10, name: 'Argentina', desc: 'Asado y pasta: un continente de inmigración resuelto a fuego lento en la parrilla.', meta: 'Asado' },
    ],
  },
  {
    id: 'gadgets-imprescindibles',
    title: 'Top 10 gadgets que sí usás todos los días',
    subtitle: 'Sin cajones de chucherías: herramientas con uso real y medible.',
    tag: 'Ranking · Gadgets',
    items: [
      { rank: 1, name: 'Balanza digital', desc: 'Repostería, fermentación y lotes: gramos que deciden si la masa funciona.', meta: '1 g de resolución' },
      { rank: 2, name: 'Termómetro de sonda', desc: 'Carne al punto, aceite de fritura y temperatura de leche para levadura.', meta: '3 s de lectura' },
      { rank: 3, name: 'Hervidor con control térmico', desc: 'Té verde a 75 °C, matcha y café por método — el agua exacta cambia todo.', meta: '5 temperaturas' },
      { rank: 4, name: 'Molinillo de pimienta', desc: 'Pimienta recién molida es otro ingrediente: aceites volátiles que se pierden en polvo.', meta: 'Mecanismo cerámico' },
      { rank: 5, name: 'Batidor globo', desc: 'Merengue, mayonesa y salsas emulsionadas sin máquinas.', meta: 'Acoso cero' },
      { rank: 6, name: 'Cuchillo chef de calidad', desc: 'No es gadget, es infraestructura: el 80 % de los cortes del día.', meta: '21 cm' },
      { rank: 7, name: 'Prensa francesa', desc: 'Café y té sin cápsulas: control total de molienda y tiempo.', meta: '4 tazas' },
      { rank: 8, name: 'Timer de cocina', desc: 'Multi-tanda sin quemar nada: tres temporizas, tres platos tranquilos.', meta: 'Multi-canal' },
      { rank: 9, name: 'Rallador con punzón', desc: 'Cítricos, nuez moscada y queso: detalle fino en segundos.', meta: 'Inox fino' },
      { rank: 10, name: 'Set de cucharones de medición', desc: 'El gadget más barato que ordena cualquier receta sin balanza.', meta: '5 piezas' },
    ],
  },
  {
    id: 'platos-mas-dificiles',
    title: 'Los 10 platos más difíciles del mundo',
    subtitle: 'Técnicas que separan a un cocinero de una cocina.',
    tag: 'Ranking · Reto',
    items: [
      { rank: 1, name: 'Soufflé perfecto', desc: 'Merengue firme, horno estable y la puerta que NUNCA se abre antes de tiempo.', meta: '6 min de gracia' },
      { rank: 2, name: 'Mole poblano', desc: 'Veinte ingredientes tostados en su punto exacto y molienda a mano.', meta: '28 ingredientes' },
      { rank: 3, name: 'Sushi de arroz tenso', desc: 'Temperatura corporal, vinagre equilibrado y corte de pescado sin error.', meta: 'Años de práctica' },
      { rank: 4, name: 'Pasta fresca lámina a mano', desc: 'Huevo, harina y pulmón: el grosor uniforme sin máquina.', meta: 'Transparente' },
      { rank: 5, name: 'Aspic cristalino', desc: 'Filtrado varias veces hasta transparencia total del caldo.', meta: '3 filtrados' },
      { rank: 6, name: 'Pâté en croûte', desc: 'Horneado con ventana de pasta que no se separa ni se hunde.', meta: 'Fuga cero' },
      { rank: 7, name: 'Pan de masa madre silvestre', desc: 'Levadura de ambiente, hidratación alta y horneado con vapor.', meta: '36 h' },
      { rank: 8, name: 'Caramelo espejo', desc: 'Azúcar a 160 °C exacta, gelatina y temperatura de vertido precisa.', meta: '1 °C de margen' },
      { rank: 9, name: 'Bacalao confitado 12 h', desc: 'Grasa a 70 °C constante y desalado previo de tres días.', meta: 'Baja temperatura' },
      { rank: 10, name: 'Tarta de Santiago sin agrietar', desc: 'Almendra, huevo y horno estable sin que la superficie se abra.', meta: 'Sin harina' },
    ],
  },
]

export function getRanking(id: string) {
  return rankings.find((r) => r.id === id)
}
