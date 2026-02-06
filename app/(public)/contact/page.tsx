import { ContactForm } from '@/components/forms/contact-form';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata = {
  title: 'İletişim | Samsun Atakum Psikolog Lokman Yılmaz',
  description:
    'Samsun Atakum psikolog randevu ve iletişim bilgileri. Uzman Psikolog Lokman Yılmaz ile iletişime geçin.'
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <Breadcrumb items={[{ label: 'İletişim' }]} />
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold mb-6">İletişime Geçin</h1>
          <p className="text-gray-600 mb-8">
            Psikolojik destek süreçleri hakkında bilgi almak veya randevu oluşturmak için aşağıdaki
            formu doldurabilir veya iletişim kanallarımızdan bize ulaşabilirsiniz.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Adres</h3>
                <p className="text-gray-600">Atakum, Samsun, Türkiye</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Telefon</h3>
                <a href="tel:+905448322091" className="text-gray-600 hover:text-primary">
                  +90 (544) 832 20 91
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-posta</h3>
                <a href="mailto:psk.lokmanylmz@gmail.com" className="text-gray-600 hover:text-primary">
                  psk.lokmanylmz@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 border">
          <h2 className="text-xl font-semibold mb-6">İletişim Formu</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
