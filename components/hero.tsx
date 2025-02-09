import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Psikolojik Sağlığınız İçin Buradayım
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Anksiyete, depresyon, fobiler, sınav kaygısı ve daha birçok psikolojik konuda uzman
          desteği almak için buradayım.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/appointment"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Randevu Al
          </Link>
          <Link
            href="#hakkimda"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
          >
            Daha Fazla Bilgi
          </Link>
        </div>
      </div>
    </section>
  );
}
