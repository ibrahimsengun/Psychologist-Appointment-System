import { Service } from '@/types/service';

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="hizmetler" className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Başlık */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            Profesyonel Destek
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bilimsel temelli yaklaşımlarla, size özel danışmanlık hizmetleri sunuyoruz
          </p>
        </div>

        {/* Hizmet Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 
                         transition-all duration-500 ease-out
                         hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* İçerik */}
              <div className="relative">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.name}
                </h3>
                {service.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                )}
              </div>

              {/* Dekoratif Köşe */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg
                            group-hover:border-primary/50 group-hover:w-12 group-hover:h-12 transition-all duration-500"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-lg
                            group-hover:border-primary/50 group-hover:w-12 group-hover:h-12 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
