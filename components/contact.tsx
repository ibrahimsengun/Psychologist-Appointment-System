import Link from 'next/link';

export default function Contact() {
  return (
    <section id="iletisim" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Size nasıl yardımcı olabilirim?</h2>
        <div className="flex justify-center space-x-4">
          <Link
            href="/appointment"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Randevu Al
          </Link>
          <Link
            href="/contact"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
          >
            Bana Ulaşın
          </Link>
        </div>
      </div>
    </section>
  );
}
