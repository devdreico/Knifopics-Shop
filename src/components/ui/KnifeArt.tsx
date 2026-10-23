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
  | 'pan'
  | 'wok'
  | 'dutch'
  | 'pot'
  | 'whisk'
  | 'utensils'
  | 'scale'
  | 'thermo'
  | 'press'
  | 'mill'
  | 'kettle'

export type Tone = 'blade' | 'dark' | 'gold' | 'wood' | 'stone' | 'copper'

/** Matte monochrome + wood/stone/copper product palettes (no bright gold). */
const palettes: Record<string, { a: string; b: string; c: string }> = {
  blade: { a: '#e8eaed', b: '#9ca3af', c: '#3f444c' },
  dark: { a: '#3a3d44', b: '#1c1e22', c: '#0a0a0a' },
  /* Beige tone — reserved for a couple of heritage pieces only */
  gold: { a: '#e6ddd0', b: '#d9cfc0', c: '#8a7f6e' },
  wood: { a: '#c4b5a0', b: '#8b7d6b', c: '#4a4034' },
  stone: { a: '#b0b4bb', c: '#2a2a2a', b: '#6b7078' },
  /* Warm copper — KITCHEN section signature */
  copper: { a: '#f0d3bd', b: '#c9855a', c: '#7a421f' },
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
  tone?: Tone
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
    pan: (
      <>
        {poly('64,92 256,92 236,152 84,152', p.a)}
        {poly('64,92 256,92 160,118', p.b, 0.7)}
        {poly('84,152 236,152 230,164 90,164', p.c)}
        {poly('58,84 262,84 256,93 64,93', p.c)}
        {poly('58,89 18,76 6,92 56,107', p.c)}
        {poly('58,89 18,76 30,88', p.b, 0.5)}
      </>
    ),
    wok: (
      <>
        {poly('72,90 238,90 208,158 102,158', p.a)}
        {poly('72,90 238,90 155,116', p.b, 0.7)}
        {poly('102,158 208,158 203,168 107,168', p.c)}
        {poly('64,84 246,84 240,93 70,93', p.c)}
        {poly('64,91 32,84 24,100 62,108', p.c)}
        {poly('246,91 278,84 286,100 248,108', p.c)}
      </>
    ),
    dutch: (
      <>
        {poly('86,96 234,96 224,168 96,168', p.a)}
        {poly('86,96 234,96 160,120', p.b, 0.65)}
        {poly('96,168 224,168 219,178 101,178', p.c)}
        {poly('78,78 242,78 242,93 78,93', p.c)}
        {poly('141,66 179,66 179,78 141,78', p.c)}
        {poly('78,108 52,102 47,120 76,127', p.c)}
        {poly('242,108 268,102 273,120 244,127', p.c)}
      </>
    ),
    pot: (
      <>
        {poly('80,80 240,80 240,170 80,170', p.a)}
        {poly('80,80 240,80 160,110', p.b, 0.55)}
        {poly('80,170 240,170 235,180 85,180', p.c)}
        {poly('74,72 246,72 246,82 74,82', p.c)}
        {poly('74,100 44,96 40,114 72,118', p.c)}
        {poly('246,100 276,96 280,114 248,118', p.c)}
        <line x1="110" y1="95" x2="110" y2="160" stroke={p.b} strokeWidth="4" opacity="0.5" />
        <line x1="210" y1="95" x2="210" y2="160" stroke={p.b} strokeWidth="4" opacity="0.5" />
      </>
    ),
    whisk: (
      <>
        {poly('141,28 164,28 161,96 144,96', p.c)}
        {poly('138,96 167,96 165,110 140,110', p.b)}
        <path d="M152 110 C 108 132, 104 162, 152 180" stroke={p.c} strokeWidth="3.5" fill="none" />
        <path d="M152 110 C 128 138, 126 164, 152 180" stroke={p.b} strokeWidth="3.5" fill="none" />
        <path d="M152 110 C 152 140, 152 164, 152 180" stroke={p.c} strokeWidth="3.5" fill="none" />
        <path d="M152 110 C 176 138, 178 164, 152 180" stroke={p.b} strokeWidth="3.5" fill="none" />
        <path d="M152 110 C 196 132, 200 162, 152 180" stroke={p.c} strokeWidth="3.5" fill="none" />
      </>
    ),
    utensils: (
      <>
        {poly('66,176 80,173 146,66 133,63', p.a)}
        {poly('129,50 156,44 163,70 140,77', p.b)}
        {poly('106,178 120,176 158,84 145,82', p.b)}
        <ellipse cx="153" cy="72" rx="13" ry="17" fill={p.a} />
        {poly('148,178 162,177 170,96 157,96', p.a)}
        <circle cx="164" cy="86" r="16" fill={p.b} />
        <circle cx="164" cy="86" r="9" fill={p.c} opacity="0.4" />
      </>
    ),
    scale: (
      <>
        {poly('70,110 250,110 256,164 64,164', p.a)}
        {poly('62,98 258,98 252,112 68,112', p.b)}
        {poly('95,126 158,126 158,150 95,150', p.c)}
        <line x1="104" y1="138" x2="148" y2="138" stroke={p.a} strokeWidth="3" opacity="0.9" />
        {poly('185,130 213,130 213,144 185,144', p.c, 0.75)}
        {poly('78,164 98,164 98,176 78,176', p.c)}
        {poly('222,164 242,164 242,176 222,176', p.c)}
      </>
    ),
    thermo: (
      <>
        {poly('62,170 224,84 231,96 69,182', p.a)}
        {poly('62,170 69,182 52,184', p.c)}
        {poly('212,58 272,46 280,84 220,96', p.a)}
        {poly('223,62 262,54 266,78 227,86', p.c)}
        <line x1="232" y1="72" x2="257" y2="67" stroke={p.a} strokeWidth="3" opacity="0.85" />
      </>
    ),
    press: (
      <>
        {poly('106,76 214,76 209,174 111,174', p.a)}
        {poly('116,96 204,96 200,158 120,158', p.b, 0.45)}
        {poly('98,62 222,62 222,77 98,77', p.c)}
        {poly('150,30 161,30 161,62 150,62', p.c)}
        {poly('137,18 174,18 174,31 137,31', p.c)}
        {poly('101,174 219,174 215,185 105,185', p.c)}
        {poly('214,90 250,84 256,140 218,146', p.c)}
        <line x1="126" y1="112" x2="126" y2="152" stroke={p.b} strokeWidth="3" opacity="0.55" />
      </>
    ),
    mill: (
      <>
        {poly('112,70 188,70 204,170 96,170', p.a)}
        {poly('112,70 188,70 150,110', p.b, 0.6)}
        {poly('104,120 196,120 199,133 101,133', p.c)}
        {poly('108,62 192,62 190,73 110,73', p.b)}
        {poly('138,50 162,50 166,63 134,63', p.c)}
        {poly('96,170 204,170 201,181 99,181', p.c)}
        <line x1="130" y1="142" x2="170" y2="142" stroke={p.b} strokeWidth="3" opacity="0.6" />
      </>
    ),
    kettle: (
      <>
        {poly('96,96 214,96 224,172 86,172', p.a)}
        {poly('96,96 214,96 155,122', p.b, 0.6)}
        {poly('214,112 254,96 262,107 220,127', p.b)}
        {poly('120,82 190,82 190,96 120,96', p.c)}
        {poly('145,70 165,70 165,82 145,82', p.c)}
        <path d="M118 82 C 130 40, 180 40, 192 82" stroke={p.c} strokeWidth="7" fill="none" />
        {poly('91,172 219,172 215,183 95,183', p.c)}
      </>
    ),
  }

  return (
    <svg viewBox="0 0 300 200" className={className} role="img" aria-hidden="true">
      <g transform="rotate(-8 150 120)">{shapes[kind]}</g>
    </svg>
  )
}
