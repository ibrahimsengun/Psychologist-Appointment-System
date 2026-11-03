import { AboutFull } from '@/components/about';
import { CallToAction } from '@/components/call-to-action';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { buildPersonSchema, JsonLd, SITE_URL, OG_IMAGE } from '@/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hakkımda | Uzm. Psk. Lokman Yılmaz - Samsun Atakum Psikolog',
    description:
        'Uzm. Psk. Lokman Yılmaz: OMÜ Psikoloji ve Evlilik ve Aile Danışmanlığı yüksek lisans mezunu. Eğitimler, danışmanlık yaklaşımı ve uzmanlık alanları.',
    alternates: {
        canonical: `${SITE_URL}/hakkimda`
    },
    openGraph: {
        images: [OG_IMAGE],
        title: 'Hakkımda | Uzm. Psk. Lokman Yılmaz',
        description: 'Eğitimler, danışmanlık yaklaşımı ve uzmanlık alanları.',
        url: `${SITE_URL}/hakkimda`,
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'profile'
    }
};

export default function HakkimdaPage() {
    return (
        <>
            <JsonLd data={buildPersonSchema({ url: `${SITE_URL}/hakkimda` })} />
            <div className="container pt-8">
                <Breadcrumb items={[{ label: 'Hakkımda' }]} />
            </div>
            <AboutFull />
            <div className="container pb-16 md:pb-24">
                <CallToAction />
            </div>
        </>
    );
}
