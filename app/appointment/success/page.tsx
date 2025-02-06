import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentSuccessPage({
  searchParams
}: {
  searchParams: { date?: string; time?: string };
}) {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Randevunuz Başarıyla Oluşturuldu</h1>

          {searchParams.date && searchParams.time && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">Randevu Detayları</p>
              <p className="text-blue-600">
                {searchParams.date} - {searchParams.time}
              </p>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Randevu detayları e-posta adresinize gönderildi. Randevunuzu iptal etmek isterseniz,
            e-postadaki iptal bağlantısını kullanabilir veya iptal kodunu kullanabilirsiniz.
          </p>
          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/appointment">Yeni Randevu Oluştur</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
