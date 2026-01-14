import { createAppointment, getAvailableTimeSlots } from '@/actions/appointment-actions';
import { AppointmentForm } from '@/components/forms/appointment-form';
import { Breadcrumb } from '@/components/ui/breadcrumb';

// Sayfayı dinamik olarak işaretle
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AppointmentPage() {
  const availableTimeSlots = await getAvailableTimeSlots();

  // Müsait zaman aralıklarını form için uygun formata dönüştürme
  const formattedTimeSlots = availableTimeSlots.reduce<{ date: string; times: string[] }[]>(
    (acc, slot) => {
      const existingDate = acc.find((item) => item.date === slot.date);
      if (existingDate) {
        existingDate.times.push(slot.startTime);
      } else {
        acc.push({ date: slot.date, times: [slot.startTime] });
      }
      return acc;
    },
    []
  );

  return (
    <div className="relative min-h-screen py-12 md:py-20 overflow-hidden">
      {/* Arka Plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <Breadcrumb items={[{ label: 'Randevu Al' }]} />
        <div className="max-w-2xl mx-auto">
          {/* Başlık Bölümü */}
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
              Görüşme Planlayın
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Randevu Al
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Size en uygun tarih ve saati seçerek randevunuzu oluşturun. Yüz yüze veya online görüşme tercih edebilirsiniz.
            </p>
          </div>

          {/* Form Kartı */}
          <div className="relative">
            {/* Dekoratif Çerçeve */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-xl"></div>

            <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
              {/* Form Başlık */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Randevu Bilgileri</h2>
                  <p className="text-sm text-muted-foreground">Lütfen aşağıdaki formu doldurun</p>
                </div>
              </div>

              {/* Form */}
              <AppointmentForm availableTimeSlots={formattedTimeSlots} action={createAppointment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
