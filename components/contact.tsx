import { TrackedLink } from '@/components/tracked-link';
import { TrackedAnchor } from '@/components/tracked-anchor';
import { SectionHeading } from '@/components/section-heading';

export default function Contact() {
  return (
    <section id="iletisim" className="container py-16 md:py-24 scroll-mt-20">
      <SectionHeading
        index="08"
        label="İletişim"
        title={
          <>
            Bir görüşmeyle <em className="text-primary">başlayalım.</em>
          </>
        }
        intro="Randevu almak ya da sorularınız için bana ulaşabilirsiniz. Yüz yüze ve online görüşme seçenekleri mevcuttur."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <dl className="border-t border-foreground/15">
            <div className="py-5 border-b border-foreground/15">
              <dt className="eyebrow mb-2">Telefon</dt>
              <dd>
                <TrackedAnchor
                  href="tel:+905448322091"
                  title="Bizi Arayın: +90 544 832 20 91"
                  event="click_phone"
                  eventSource="contact_section"
                  className="font-heading text-2xl md:text-3xl hover:text-primary transition-colors"
                >
                  0544 832 20 91
                </TrackedAnchor>
              </dd>
            </div>
            <div className="py-5 border-b border-foreground/15">
              <dt className="eyebrow mb-2">E-posta</dt>
              <dd>
                <TrackedAnchor
                  href="mailto:psk.lokmanylmz@gmail.com"
                  title="Bize E-posta Gönderin: psk.lokmanylmz@gmail.com"
                  event="click_email"
                  eventSource="contact_section"
                  className="font-heading text-xl md:text-2xl hover:text-primary transition-colors break-all"
                >
                  psk.lokmanylmz@gmail.com
                </TrackedAnchor>
              </dd>
            </div>
            <div className="py-5 border-b border-foreground/15">
              <dt className="eyebrow mb-2">Adres</dt>
              <dd className="text-lg leading-relaxed">
                Psikodemy, Cumhuriyet Mahallesi 93. Sokak No:21 Daire 12, Atakum / Samsun
              </dd>
            </div>
            <div className="py-5 border-b border-foreground/15">
              <dt className="eyebrow mb-2">Çalışma Saatleri</dt>
              <dd className="text-lg leading-relaxed">Hafta içi 09:00–18:00 · Cumartesi 09:00–14:00</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <TrackedLink
              href="/appointment"
              title="Hemen Randevu Al"
              event="click_appointment"
              eventSource="contact_section"
              className="inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-4 font-medium hover:bg-primary transition-colors"
            >
              Randevu Al <span aria-hidden="true">→</span>
            </TrackedLink>
            <TrackedLink
              href="/contact"
              title="İletişim Formuna Git"
              event="click_contact"
              eventSource="contact_section"
              className="link-underline"
            >
              İletişim formu
            </TrackedLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative h-[320px] md:h-full md:min-h-[460px] overflow-hidden rounded-sm bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.991582958689!2d36.26423416745912!3d41.33079638945286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x408879deef97da1f%3A0x30fa7f912eeeea6c!2sSamsun%20Atakum%20Psikolog%20-%20Lokman%20Y%C4%B1lmaz!5e0!3m2!1sen!2str!4v1773603194118!5m2!1sen!2str"
              title="Psikodemy Atakum ofisi haritası"
              className="absolute inset-0 w-full h-full grayscale-[60%] hover:grayscale-0 transition-[filter] duration-500"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
