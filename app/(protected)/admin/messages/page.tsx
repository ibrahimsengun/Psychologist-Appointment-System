import { getContactMessages } from '@/actions/contact-messages-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import ContactMessagesTable from '@/components/contact-messages-table';

export default async function MessagesPage() {
  const messages = await getContactMessages();
  return (
    <div className="container mx-auto py-8">
      <AdminPageHeader title="Mesajlar" description="Sitedeki iletişim formundan gönderilen mesajlar." />

      <div className="rounded-lg border bg-card">
        {messages.length > 0 ? (
          <ContactMessagesTable contactMessages={messages} />
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">Henüz mesaj gelmedi.</p>
        )}
      </div>
    </div>
  );
}
