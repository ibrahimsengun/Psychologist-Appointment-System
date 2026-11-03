import { getPublishedBlogPosts } from '@/actions/blog-actions';
import { getHomepageFAQs } from '@/actions/faq-actions';
import { getReviews } from '@/actions/review-actions';
import { getPublishedServices } from '@/actions/service-actions';
import { getVideos } from '@/actions/video-actions';
import About from '@/components/about';
import Blog from '@/components/blog';
import Contact from '@/components/contact';
import { FAQSection } from '@/components/faq-section';
import Hero from '@/components/hero';
import ReviewsSection from '@/components/reviews-section';
import Services from '@/components/services';
import VideoSection from '@/components/video-section';
import ProcessSteps from '@/components/process-steps';
import { buildProfessionalServiceSchema, JsonLd, SITE_URL } from '@/lib/schema';
import type { Service } from '@/types/service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL
  }
};

// Ana sayfada gösterilecek öne çıkan hizmetler (sırasıyla); biri silinirse kalanlar diğer hizmetlerle tamamlanır
const FEATURED_SERVICE_SLUGS = [
  'bireysel-danismanlik',
  'cift-ve-aile-danismanligi',
  'cocuk-ve-ergen-danismanligi',
  'anksiyete',
  'depresyon',
  'online-danismanlik'
];

function pickFeaturedServices(services: Service[], count = 6) {
  const featured = FEATURED_SERVICE_SLUGS
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => !!s);
  const rest = services.filter((s) => !featured.includes(s));
  return [...featured, ...rest].slice(0, count);
}

export default async function Home() {
  const [blogPosts, services, faqs, videos, reviews] = await Promise.all([
    getPublishedBlogPosts(),
    getPublishedServices(),
    getHomepageFAQs(),
    getVideos(),
    getReviews()
  ]);

  const businessJsonLd = buildProfessionalServiceSchema();
  const rating = reviews.length
    ? { average: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length, count: reviews.length }
    : undefined;

  return (
    <>
      <JsonLd data={businessJsonLd} />
      <Hero rating={rating} />
      <div className="max-w-[100vw] overflow-x-hidden">
        <ReviewsSection reviews={reviews} />
      </div>
      <About />
      <Services services={pickFeaturedServices(services)} totalCount={services.length} />
      <ProcessSteps />
      <Blog blogPosts={blogPosts.slice(0, 3)} />
      <div className="max-w-[100vw] overflow-x-hidden">
        <VideoSection videos={videos.slice(0, 3)} />
      </div>
      <FAQSection faqs={faqs} />
      <Contact />
    </>
  );
}
