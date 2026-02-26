import { getWhatsAppSettings } from '@/actions/settings-actions';
import { WhatsAppSettingsForm } from '@/components/whatsapp-settings-form';

export default async function SettingsPage() {
    const whatsappSettings = await getWhatsAppSettings();

    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Ayarlar</h1>
                <p className="text-muted-foreground mt-1">
                    Site ayarlarını buradan yönetebilirsiniz.
                </p>
            </div>

            <WhatsAppSettingsForm initialSettings={whatsappSettings} />
        </div>
    );
}
