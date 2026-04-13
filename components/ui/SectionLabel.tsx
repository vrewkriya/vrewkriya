interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="block w-10 h-px opacity-50"
        style={{ background: 'var(--gold-dim)' }}
      />
      <span
        className="text-gold uppercase font-sans font-medium tracking-widest3"
        style={{ fontSize: '0.6rem' }}
      >
        {children}
      </span>
      <span
        className="block w-10 h-px opacity-50"
        style={{ background: 'var(--gold-dim)' }}
      />
    </div>
  )
}
