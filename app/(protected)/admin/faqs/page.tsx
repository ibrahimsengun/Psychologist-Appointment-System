import { getAllFAQs } from '@/actions/faq-actions';
import { FAQsClient } from '@/components/faqs-client';

export default async function FAQsAdminPage() {
    const faqs = await getAllFAQs();

    return <FAQsClient initialFAQs={faqs} />;
}
