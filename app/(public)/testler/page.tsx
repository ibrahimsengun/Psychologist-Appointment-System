import { Metadata } from 'next';
import { getAllTests } from '@/data/psychological-tests';
import { TestCard } from '@/components/tests';

export const metadata: Metadata = {
    title: 'Psikolojik Testler | Uzman Psk. Lokman Yılmaz',
    description: 'Ücretsiz online psikolojik tarama testleri. Anksiyete, depresyon ve stres seviyenizi ölçün. Bilimsel olarak geçerlilenmiş ölçekler.',
    robots: {
        index: false, // Şimdilik gizli
        follow: false
    }
};

export default function TestlerPage() {
    const tests = getAllTests();

    return (
        <main>
            <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Psikolojik Tarama Testleri
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Bilimsel olarak geçerlilenmiş ölçeklerle kendinizi değerlendirin.
                            Bu testler yalnızca bilgilendirme amaçlıdır ve profesyonel bir
                            değerlendirmenin yerini almaz.
                        </p>
                    </div>

                    {/* Test Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tests.map(test => (
                            <TestCard key={test.id} test={test} />
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-3xl mx-auto">
                        <h3 className="font-semibold text-blue-900 mb-2">
                            Bu Testler Hakkında
                        </h3>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            Burada yer alan testler, dünya genelinde kullanılan ve Türkiye&apos;de
                            geçerliliği kanıtlanmış standart tarama araçlarıdır. Test sonuçları
                            kesin bir tanı değildir.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
