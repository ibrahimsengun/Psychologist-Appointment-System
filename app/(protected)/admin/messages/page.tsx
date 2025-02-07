import { getContactMessages } from '@/actions/contact-messages-actions';
import ContactMessagesTable from '@/components/contact-messages-table';

export default async function MessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">İletişim Mesajları</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <ContactMessagesTable contactMessages={messages} />
      </div>
    </div>
  );
}
