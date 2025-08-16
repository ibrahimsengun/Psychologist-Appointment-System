import { Service } from '@/types/service';

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="hizmetler" className="bg-gray-50 py-6 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold">{service.name}</h3>
              {service.description && <p className="text-gray-600 mt-2">{service.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
