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
    image: 'https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg',
    logo: 'https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg',
    url: 'https://www.lokmanyilmaz.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Samsun',
      addressRegion: 'Atakum',
      addressCountry: 'TR'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Samsun',
        '@id': 'https://www.wikidata.org/wiki/Q79876'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Atakum',
        containedIn: {
          '@type': 'City',
          name: 'Samsun'
        }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'İlkadım',
        containedIn: {
          '@type': 'City',
          name: 'Samsun'
        }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Canik',
        containedIn: {
          '@type': 'City',
          name: 'Samsun'
        }
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Bafra',
        containedIn: {
          '@type': 'City',
          name: 'Samsun'
        }
      }
    ],
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

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lokman Yılmaz',
    jobTitle: 'Uzman Psikolog ve Aile Danışmanı',
    description: 'Samsun Atakum\'da psikolog ve aile danışmanlığı hizmeti veren uzman psikolog',
    image: 'https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg',
    url: 'https://www.lokmanyilmaz.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Samsun',
      addressRegion: 'Atakum',
      addressCountry: 'TR'
    },
    telephone: '+905448322091',
    worksFor: {
      '@type': 'Organization',
      name: 'Psikodemy'
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
