import type { Culture } from '../types'

export const cultures: Culture[] = [
  {
    slug: 'japon',
    name: 'Japón',
    region: 'Asia oriental',
    tagline: 'Geometría, acero y precisión',
    description:
      'La cuchillería japonesa reúne tradiciones regionales y perfiles especializados. La geometría de la hoja, el tratamiento térmico y el mantenimiento importan tanto como el nombre del acero.',
    dishes: [
      { name: 'Gyuto', note: 'Perfil versátil de origen occidental adaptado a la cocina japonesa.' },
      { name: 'Santoku', note: 'Hoja compacta para carne, pescado y vegetales.' },
      { name: 'Nakiri', note: 'Filo recto pensado para cortes verticales de vegetales.' },
    ],
    essentials: [
      { name: 'Santoku Nero', productSlug: 'santoku-nero-18' },
      { name: 'Nakiri Vegetal', productSlug: 'nakiri-vegetal-17' },
      { name: 'Piedra de afilar 1000 / 6000', productSlug: 'whetstone-1000-6000' },
    ],
    tip: 'Usá una tabla blanda y lavá y secá la hoja a mano; evitá torsionar el filo en el corte.',
  },
  {
    slug: 'alemania',
    name: 'Alemania',
    region: 'Europa central',
    tagline: 'Resistencia para el trabajo diario',
    description:
      'La tradición alemana suele priorizar hojas robustas, acero inoxidable y perfiles de uso general. El equilibrio entre durabilidad y facilidad de mantenimiento hace que estos cuchillos sean habituales en cocinas profesionales.',
    dishes: [
      { name: 'Chef occidental', note: 'Hoja alta y curva, cómoda para el movimiento de balanceo.' },
      { name: 'Cuchillo de pan', note: 'Dentado que atraviesa cortezas sin aplastar la miga.' },
      { name: 'Cuchillo de puntilla', note: 'Control fino para pelar y trabajar piezas pequeñas.' },
    ],
    essentials: [
      { name: 'Bread Ondulado', productSlug: 'bread-ondulado-26' },
      { name: 'Paring Essentials', productSlug: 'paring-essentials-9' },
      { name: 'Guardacuchillos Bunker', productSlug: 'guardacuchillos-bunker' },
    ],
    tip: 'Elegí el ángulo de mantenimiento según el filo original; no fuerces un bisel nuevo sin necesidad.',
  },
  {
    slug: 'francia',
    name: 'Francia',
    region: 'Europa occidental',
    tagline: 'Perfil clásico y balance cuidado',
    description:
      'La cuchillería francesa se reconoce por perfiles de chef con curvatura marcada y tradición artesanal en distintas regiones. El diseño busca precisión, balance y control para la cocina diaria.',
    dishes: [
      { name: 'Perfil francés', note: 'Curva progresiva que acompaña el corte de balanceo.' },
      { name: 'Navaja de bolsillo', note: 'Diseño plegable tradicional para uso cotidiano.' },
      { name: 'Acabados artesanales', note: 'Mangos y terminaciones varían según taller y región.' },
    ],
    essentials: [
      { name: 'Chef Damascus', productSlug: 'chef-damascus-21' },
      { name: 'Set Steak Mistral', productSlug: 'set-steak-mistral-x4' },
      { name: 'Piedra de afilar 1000 / 6000', productSlug: 'whetstone-1000-6000' },
    ],
    tip: 'El balance es personal: probá el agarre de pinza y el control de la punta antes de elegir una hoja.',
  },
]
