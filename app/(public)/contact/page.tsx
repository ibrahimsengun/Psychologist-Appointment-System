import { ContactForm } from '@/components/forms/contact-form';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">İletişim</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
