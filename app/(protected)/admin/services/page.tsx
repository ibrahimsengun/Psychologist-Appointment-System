import { getServices } from '@/actions/service-actions';
import { ServicesTable } from '@/components/services-table';
import { CreateServiceDialog } from '@/components/services/create-service-dialog';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hizmetler</h1>
        <CreateServiceDialog />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <ServicesTable services={services} />
      </div>
    </div>
  );
}
