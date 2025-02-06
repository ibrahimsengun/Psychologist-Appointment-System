import About from '@/components/about';
import Blog from '@/components/blog';
import Contact from '@/components/contact';
import Hero from '@/components/hero';
import Services from '@/components/services';

export default async function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Blog />
      <Contact />
    </main>
  );
}
