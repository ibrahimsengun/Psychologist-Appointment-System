import { UserIcon, UsersIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Bireysel Terapi',
    description: 'Kişiye özel, bire bir psikolojik destek ve terapi hizmeti.',
    icon: UserIcon
  },
  {
    title: 'Aile ve Çift Terapisi',
    description: 'İlişkileri güçlendirmek ve aile dinamiklerini iyileştirmek için terapi.',
    icon: UsersIcon
  },
  {
    title: 'Online Danışmanlık',
    description: 'Uzaktan, çevrimiçi psikolojik danışmanlık hizmeti.',
    icon: VideoIcon
  }
];

export default function Services() {
  return (
    <section id="hizmetler" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-6 rounded-lg shadow-md">
              <service.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link href="#" className="text-blue-600 hover:underline">
                Detaylı Bilgi
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
