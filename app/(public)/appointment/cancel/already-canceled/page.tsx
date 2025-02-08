import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';

export default function AlreadyCanceledPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-center mb-4">
            <InfoIcon className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Randevu Zaten İptal Edilmiş</h1>
          <p className="text-gray-600 mb-6">
            Bu randevu daha önce iptal edilmiş. Yeni bir randevu oluşturmak isterseniz aşağıdaki
            butonu kullanabilirsiniz.
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
