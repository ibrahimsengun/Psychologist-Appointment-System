import { getServices } from '@/actions/service-actions';
import { ServicesTable } from '@/components/services-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hizmetler</h1>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Hizmet
          </Link>
        </Button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <ServicesTable services={services} />
      </div>
    </div>
  );
}
