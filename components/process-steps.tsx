import { TrackedLink } from '@/components/tracked-link';

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
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Süreç</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Danışmanlık Süreci Nasıl İşler?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            İlk adımı atmak çoğu zaman en zor kısımdır. Süreç sade ve tamamen gizlidir.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative bg-background rounded-2xl p-6 md:p-8 border border-border/60">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-5">
                {index + 1}
              </span>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="text-center mt-10">
          <TrackedLink
            href="/appointment"
            title="Online veya Yüz Yüze Randevu Al"
            event="click_appointment"
            eventSource="process_section"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
          >
            Randevu Al
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
