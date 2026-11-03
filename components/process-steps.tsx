import { TrackedLink } from '@/components/tracked-link';
import { SectionHeading } from '@/components/section-heading';

const STEPS = [
  {
    title: 'Randevunuzu alın',
    text: 'Online randevu formundan size uygun gün ve saati seçin ya da telefonla, WhatsApp’tan ulaşın.'
  },
  {
    title: 'İlk görüşme',
    text: 'İlk görüşmede sizi dinliyor, beklentilerinizi ve ihtiyaçlarınızı birlikte netleştiriyoruz.'
  },
  {
    title: 'Size özel süreç',
    text: 'Atakum’daki ofiste yüz yüze ya da online olarak, size uygun bir danışmanlık planıyla devam ediyoruz.'
  }
];

export default function ProcessSteps() {
  return (
    <section className="container py-16 md:py-24">
      <SectionHeading
        index="04"
        label="Süreç"
        title={
          <>
            İlk adım, <em className="text-primary">en zor</em> adımdır.
          </>
        }
        intro="Süreç sade ve tamamen gizlidir. Nasıl ilerlediğimizi baştan bilmeniz için üç adımda anlattık."
      />

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
        {STEPS.map((step, index) => (
          <li key={step.title} className="border-t border-foreground/15 pt-6">
            <span className="block font-heading text-7xl md:text-8xl leading-none text-clay/80" aria-hidden="true">
              {index + 1}
            </span>
            <h3 className="mt-6 text-2xl md:text-3xl">{step.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <TrackedLink
          href="/appointment"
          title="Online veya Yüz Yüze Randevu Al"
          event="click_appointment"
          eventSource="process_section"
          className="inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-4 font-medium hover:bg-primary transition-colors"
        >
          Randevu Al <span aria-hidden="true">→</span>
        </TrackedLink>
      </div>
    </section>
  );
}
