import type { Ranking } from '../types'

export const rankings: Ranking[] = [
  {
    id: 'perfiles-de-cuchillo',
    title: 'Perfiles de cuchillo para cada tarea',
    subtitle: 'Una selección orientativa por versatilidad y especialización.',
    tag: 'Guía · Perfiles',
    items: [
      { rank: 1, name: 'Chef', desc: 'El perfil más versátil para picar, rebanar y trabajar piezas grandes.', meta: 'Todoterreno' },
      { rank: 2, name: 'Santoku', desc: 'Una alternativa compacta para cortes verticales y trabajo diario.', meta: 'Versátil' },
      { rank: 3, name: 'Nakiri', desc: 'Hoja recta para cortes limpios de vegetales contra la tabla.', meta: 'Vegetales' },
      { rank: 4, name: 'Puntilla', desc: 'Control y precisión en tareas pequeñas que requieren trabajar en la mano.', meta: 'Detalle' },
      { rank: 5, name: 'Pan', desc: 'Dentado pensado para cortezas y productos de miga tierna.', meta: 'Dentado' },
    ],
  },
  {
    id: 'aceros-por-mantenimiento',
    title: 'Aceros según su mantenimiento',
    subtitle: 'Una comparación general: el tratamiento térmico y la geometría también influyen.',
    tag: 'Guía · Aceros',
    items: [
      { rank: 1, name: 'Inoxidable X50CrMoV15', desc: 'Resistente a la corrosión y de mantenimiento relativamente sencillo.', meta: 'Fácil cuidado' },
      { rank: 2, name: 'AUS-10', desc: 'Acero inoxidable de buen equilibrio entre retención del filo y facilidad de afilado.', meta: 'Equilibrado' },
      { rank: 3, name: 'VG-10', desc: 'Acero inoxidable de alta dureza; requiere evitar golpes y torsiones.', meta: 'Filo fino' },
      { rank: 4, name: '1095 al carbono', desc: 'Responde bien al afilado, pero necesita secado inmediato para evitar corrosión.', meta: 'Requiere cuidado' },
      { rank: 5, name: 'Shirogami', desc: 'Acero al carbono que permite un filo fino y exige limpieza y secado frecuentes.', meta: 'Tradicional' },
    ],
  },
  {
    id: 'cuidado-del-filo',
    title: 'Hábitos que prolongan el filo',
    subtitle: 'Prácticas simples que reducen el desgaste y evitan daños comunes.',
    tag: 'Guía · Mantenimiento',
    items: [
      { rank: 1, name: 'Usar una tabla adecuada', desc: 'Madera o plástico de calidad amortiguan el contacto mejor que vidrio, piedra o cerámica.', meta: 'Cada uso' },
      { rank: 2, name: 'Lavar y secar a mano', desc: 'Evita golpes, humedad retenida y detergentes agresivos del lavavajillas.', meta: 'Después de usar' },
      { rank: 3, name: 'Guardar con protección', desc: 'Una funda, bloque o soporte magnético evita que el filo choque con otros utensilios.', meta: 'Al guardar' },
      { rank: 4, name: 'Alinear según el acero', desc: 'Usa una herramienta compatible con la dureza y el tipo de bisel de la hoja.', meta: 'Mantenimiento' },
      { rank: 5, name: 'Afilado controlado', desc: 'Mantén un ángulo constante y retira solo el material necesario.', meta: 'Cuando haga falta' },
    ],
  },
]
