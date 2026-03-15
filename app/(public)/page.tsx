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
import { buildProfessionalServiceSchema, buildPersonSchema, JsonLd, SITE_URL } from '@/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL
  }
};

export default async function Home() {
  const [blogPosts, services, faqs, videos, reviews] = await Promise.all([
    getPublishedBlogPosts(),
    getPublishedServices(),
    getHomepageFAQs(),
    getVideos(),
    getReviews()
  ]);

  const businessJsonLd = buildProfessionalServiceSchema();
  const personJsonLd = buildPersonSchema();

  return (
    <>
      <JsonLd data={businessJsonLd} />
      <JsonLd data={personJsonLd} />
      <Hero />
      <About />
      <Services services={services} />
      <Blog blogPosts={blogPosts.slice(0, 3)} />
      <div className="max-w-[100vw] overflow-x-hidden">
        <VideoSection videos={videos.slice(0, 6)} />
        <ReviewsSection reviews={reviews} />
      </div>
      <FAQSection faqs={faqs} />
      <Contact />
    </>
  );
}
