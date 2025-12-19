import { getBlogPosts } from '@/actions/blog-actions';
import { getServices } from '@/actions/service-actions';
import About from '@/components/about';
import Blog from '@/components/blog';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';

export default async function Home() {
  const blogPosts = await getBlogPosts();
  const services = await getServices();

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Uzman Psk. Lokman Yılmaz',
    description: 'Samsun Aile Danışmanı ve Psikolojik Destek',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Samsun',
      addressCountry: 'TR'
    },
    telephone: '+905448322091',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00'
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <Header />
      <Hero />
      <About />
      <Services services={services} />
      <Blog blogPosts={blogPosts.slice(0, 3)} />
      <Contact />
      <Footer />
    </main>
  );
}
