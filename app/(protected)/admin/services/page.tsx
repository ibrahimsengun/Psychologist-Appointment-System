import { getServices } from '@/actions/service-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { ServicesTable } from '@/components/services-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto py-8">
      <AdminPageHeader
        title="Hizmetler"
        description="Hizmetler sayfasında ve anasayfada görünen danışmanlık alanları."
        action={
          <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Hizmet
          </Link>
        </Button>
        }
      />

      <div className="rounded-lg border bg-card p-6">
        {services.length > 0 ? (
          <ServicesTable services={services} />
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Henüz hizmet yok. &quot;Yeni Hizmet&quot; ile ilk hizmetinizi ekleyebilirsiniz.
          </p>
        )}
      </div>
    </div>
  );
}
