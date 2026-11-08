import { getServiceById, updateService } from '@/actions/service-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { ServiceForm } from '@/components/forms/service-form';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let service;
    try {
        service = await getServiceById(id);
    } catch {
        notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <AdminPageHeader title="Hizmet Düzenle" />
            <ServiceForm initialData={service} onSubmit={updateService} />
        </div>
    );
}
