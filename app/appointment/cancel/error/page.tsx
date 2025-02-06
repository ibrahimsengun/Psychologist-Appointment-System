import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancelErrorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">İptal İşlemi Başarısız</h1>
          <p className="text-gray-600 mb-6">
            Randevunuz iptal edilirken bir hata oluştu. Lütfen tekrar deneyin veya bizimle iletişime
            geçin.
          </p>
          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/appointment/cancel">Tekrar Dene</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/contact">İletişime Geç</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
