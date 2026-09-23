export type ArtKind =
  | 'chef'
  | 'santoku'
  | 'nakiri'
  | 'paring'
  | 'bread'
  | 'cleaver'
  | 'steak'
  | 'board'
  | 'whetstone'
  | 'block'

const palettes: Record<string, { a: string; b: string; c: string }> = {
  blade: { a: '#c8ced8', b: '#7d8796', c: '#3d4552' },
  dark: { a: '#4a5160', b: '#2a2f3a', c: '#12151c' },
  gold: { a: '#e0c56e', b: '#b8912f', c: '#6e5418' },
  wood: { a: '#c4a574', b: '#8b6914', c: '#4a3720' },
  stone: { a: '#9aa3b2', b: '#5c6575', c: '#2b303a' },
}

function poly(points: string, fill: string, opacity = 1) {
  return <polygon points={points} fill={fill} opacity={opacity} />
}

export default function KnifeArt({
  kind = 'chef',
  tone = 'blade',
  className = '',
}: {
  kind?: ArtKind
  tone?: 'blade' | 'dark' | 'gold' | 'wood' | 'stone'
  className?: string
}) {
  const p = palettes[tone] ?? palettes.blade

  const shapes: Record<ArtKind, React.ReactNode> = {
    chef: (
      <>
        {poly('40,120 210,88 250,110 210,132 40,140', p.a)}
        {poly('40,120 210,88 250,110 140,112', p.b, 0.85)}
        {poly('40,140 210,132 200,145 45,150', p.c, 0.9)}
        {poly('10,118 40,120 40,140 12,148 4,135', p.c)}
        {poly('10,118 40,120 28,130', p.b, 0.7)}
        <line x1="210" y1="88" x2="210" y2="132" stroke={p.c} strokeWidth="2" />
      </>
    ),
    santoku: (
      <>
        {poly('50,95 230,90 245,130 55,145', p.a)}
        {poly('50,95 230,90 150,115', p.b, 0.8)}
        {poly('55,145 245,130 240,145 60,152', p.c)}
        {poly('8,105 50,95 55,145 14,152 4,130', p.c)}
        {poly('8,105 50,95 35,120', p.b, 0.6)}
      </>
    ),
    nakiri: (
      <>
        {poly('55,80 235,80 240,155 60,155', p.a)}
        {poly('55,80 235,80 145,115', p.b, 0.75)}
        {poly('60,155 240,155 238,165 62,165', p.c)}
        {poly('10,95 55,80 60,155 16,162 6,130', p.c)}
      </>
    ),
    paring: (
      <>
        {poly('70,115 200,95 235,120 195,140 70,135', p.a)}
        {poly('70,115 200,95 235,120 130,118', p.b, 0.8)}
        {poly('70,135 195,140 190,150 72,148', p.c)}
        {poly('25,110 70,115 70,135 30,145 18,128', p.c)}
      </>
    ),
    bread: (
      <>
        {poly('55,110 245,100 250,130 58,140', p.a)}
        {poly('55,110 245,100 150,118', p.b, 0.7)}
        {poly('70,118 90,110 95,128 75,134', p.c, 0.5)}
        {poly('100,116 120,108 125,126 105,132', p.c, 0.5)}
        {poly('130,114 150,106 155,124 135,130', p.c, 0.5)}
        {poly('160,112 180,104 185,122 165,128', p.c, 0.5)}
        {poly('190,110 210,102 215,120 195,126', p.c, 0.5)}
        {poly('12,105 55,110 58,140 18,148 6,128', p.c)}
      </>
    ),
    cleaver: (
      <>
        {poly('60,75 230,70 240,160 65,165', p.a)}
        {poly('60,75 230,70 145,115', p.b, 0.8)}
        {poly('65,165 240,160 238,175 68,178', p.c)}
        {poly('12,95 60,75 65,165 20,170 8,135', p.c)}
        {poly('12,95 60,75 38,120', p.b, 0.55)}
      </>
    ),
    steak: (
      <>
        {poly('60,118 210,100 230,125 205,142 62,140', p.a)}
        {poly('60,118 210,100 230,125 130,122', p.b, 0.75)}
        {poly('62,140 205,142 200,152 65,150', p.c)}
        {poly('15,112 60,118 62,140 22,148 10,130', p.c)}
      </>
    ),
    board: (
      <>
        {poly('50,70 260,70 280,160 40,160', p.a)}
        {poly('50,70 260,70 155,115', p.b, 0.6)}
        {poly('40,160 280,160 275,175 45,175', p.c)}
        {poly('260,85 275,85 278,100 263,100', p.c)}
        <line x1="80" y1="90" x2="250" y2="90" stroke={p.c} strokeWidth="1.5" opacity="0.35" />
        <line x1="75" y1="115" x2="255" y2="115" stroke={p.c} strokeWidth="1.5" opacity="0.35" />
        <line x1="70" y1="140" x2="258" y2="140" stroke={p.c} strokeWidth="1.5" opacity="0.35" />
      </>
    ),
    whetstone: (
      <>
        {poly('60,90 250,90 270,155 50,155', p.a)}
        {poly('60,90 250,90 155,120', p.b, 0.7)}
        {poly('50,155 270,155 265,172 55,172', p.c)}
        {poly('70,75 240,75 250,90 60,90', p.b)}
        <line x1="90" y1="110" x2="230" y2="110" stroke={p.c} strokeWidth="2" opacity="0.4" />
        <line x1="85" y1="130" x2="240" y2="130" stroke={p.c} strokeWidth="2" opacity="0.4" />
      </>
    ),
    block: (
      <>
        {poly('70,75 240,75 255,165 55,165', p.a)}
        {poly('70,75 240,75 155,115', p.b, 0.65)}
        {poly('55,165 255,165 250,178 60,178', p.c)}
        {poly('100,95 130,95 135,145 105,145', p.c, 0.35)}
        {poly('150,95 180,95 185,145 155,145', p.c, 0.35)}
        {poly('200,95 230,95 235,145 205,145', p.c, 0.35)}
      </>
    ),
  }

  return (
    <svg viewBox="0 0 300 200" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`g-${kind}-${tone}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.a} />
          <stop offset="100%" stopColor={p.c} />
        </linearGradient>
      </defs>
      <g transform="rotate(-8 150 120)">{shapes[kind]}</g>
    </svg>
  )
}
