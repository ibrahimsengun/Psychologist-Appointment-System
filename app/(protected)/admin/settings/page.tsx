import { getWhatsAppSettings } from '@/actions/settings-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { WhatsAppSettingsForm } from '@/components/whatsapp-settings-form';

export default async function SettingsPage() {
    const whatsappSettings = await getWhatsAppSettings();

    return (
        <div className="container py-8">
            <AdminPageHeader title="Site Ayarları" description="Sitedeki WhatsApp butonunun ayarları." />

            <WhatsAppSettingsForm initialSettings={whatsappSettings} />
        </div>
    );
}
