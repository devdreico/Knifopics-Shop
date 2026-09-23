import Reveal from './Reveal'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: Props) {
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : 'text-left'
  return (
    <Reveal className={`max-w-3xl flex flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span className="clip-tag inline-flex w-fit bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] uppercase">{title}</h2>
      {subtitle && <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </Reveal>
  )
}
