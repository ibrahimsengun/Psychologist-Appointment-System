import About from '@/components/about';
import { CallToAction } from '@/components/call-to-action';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { buildPersonSchema, JsonLd, OG_IMAGE, PERSON_NAME, SITE_URL } from '@/lib/schema';
import type { Metadata } from 'next';

const title = `Uzm. Psk. ${PERSON_NAME} Kimdir? Eğitim ve Çalışma Alanları`;
const description = `Uzman Psikolog ve Aile Danışmanı ${PERSON_NAME}: Ondokuz Mayıs Üniversitesi psikoloji lisansı, evlilik ve aile danışmanlığı yüksek lisansı, aldığı eğitimler ve çalışma alanları.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${SITE_URL}/hakkimda`
    },
    openGraph: {
        images: [OG_IMAGE],
        title,
        description,
        url: `${SITE_URL}/hakkimda`,
        type: 'profile',
        locale: 'tr_TR'
    }
};

export default function HakkimdaPage() {
    return (
        <>
            <JsonLd data={buildPersonSchema({ description })} />
            <div className="container mx-auto px-4 pt-8">
                <Breadcrumb items={[{ label: 'Hakkımda' }]} />
                <h1 className="text-4xl md:text-5xl font-bold mt-4">Uzm. Psk. {PERSON_NAME} Hakkında</h1>
            </div>
            <About />
            <div className="container mx-auto px-4 pb-16">
                <CallToAction />
            </div>
        </>
    );
}
