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
    <Reveal className={`flex max-w-3xl flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span className="clip-tag inline-flex w-fit bg-[var(--beige-soft)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--ink)] ring-1 ring-[var(--beige)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl leading-[1.04] font-extrabold uppercase sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  )
}
