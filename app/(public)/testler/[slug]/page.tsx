import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTestBySlug, getAllTests } from '@/data/psychological-tests';
import { TestWizard } from '@/components/tests';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface TestPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
    const { slug } = await params;
    const test = getTestBySlug(slug);

    if (!test) {
        return {
            title: 'Test Bulunamadı'
        };
    }

    return {
        title: `${test.title} | Uzman Psk. Lokman Yılmaz`,
        description: test.description,
        robots: {
            index: false, // Şimdilik gizli
            follow: false
        }
    };
}

export async function generateStaticParams() {
    const tests = getAllTests();
    return tests.map(test => ({
        slug: test.slug
    }));
}

export default async function TestPage({ params }: TestPageProps) {
    const { slug } = await params;
    const test = getTestBySlug(slug);

    if (!test) {
        notFound();
    }

    return (
        <main>
            <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30 min-h-[calc(100vh-200px)]">
                <div className="container max-w-4xl mx-auto px-4">
                    <TestWizard test={test} />
                </div>
            </section>
        </main>
    );
}
