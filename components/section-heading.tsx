import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Başlığın sağ alt köşesinde duran link vb. */
  action?: React.ReactNode;
  /** Koyu zeminli bölümlerde açık renkli çizgi ve metin */
  invert?: boolean;
  className?: string;
}

// Editoryal bölüm başlığı: ince çizgi, "01 — Etiket" ve büyük serif başlık
export function SectionHeading({ index, label, title, intro, action, invert, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 border-t pt-6 mb-12 md:mb-16',
        invert ? 'border-primary-foreground/25' : 'border-foreground/15',
        className
      )}
    >
      <p className={cn('eyebrow lg:col-span-3', invert && 'text-primary-foreground/70')}>
        <span className={cn('font-heading text-sm normal-case tracking-normal mr-2', invert ? 'text-primary-foreground' : 'text-clay')}>
          {index}
        </span>
        — {label}
      </p>
      <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]">{title}</h2>
          {intro && (
            <p className={cn('mt-5 text-lg max-w-2xl leading-relaxed', invert ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
              {intro}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
