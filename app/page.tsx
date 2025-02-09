import { getBlogPosts } from '@/actions/blog-actions';
import About from '@/components/about';
import Blog from '@/components/blog';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';

export default async function Home() {
  const blogPosts = await getBlogPosts();
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Blog blogPosts={blogPosts.slice(0, 4)} />
      <Contact />
      <Footer />
    </main>
  );
}
