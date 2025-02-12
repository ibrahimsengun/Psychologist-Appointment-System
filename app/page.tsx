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
  return (
    <main>
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
