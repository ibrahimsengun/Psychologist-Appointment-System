import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancelSuccessPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Randevunuz İptal Edildi</h1>
          <p className="text-gray-600 mb-6">
            Randevunuz başarıyla iptal edildi. Yeni bir randevu oluşturmak isterseniz aşağıdaki
            butonu kullanabilirsiniz.
          </p>
          <Button asChild className="w-full">
            <Link href="/appointment">Yeni Randevu Oluştur</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
