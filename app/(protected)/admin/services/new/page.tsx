import { createService } from '@/actions/service-actions';
import { ServiceForm } from '@/components/forms/service-form';

export default function NewServicePage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Yeni Hizmet Oluştur</h1>
            <ServiceForm onSubmit={createService} />
        </div>
    );
}
