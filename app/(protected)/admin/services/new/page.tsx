import { createService } from '@/actions/service-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { ServiceForm } from '@/components/forms/service-form';

export default function NewServicePage() {
    return (
        <div className="container mx-auto py-8">
            <AdminPageHeader title="Yeni Hizmet Oluştur" />
            <ServiceForm onSubmit={createService} />
        </div>
    );
}
