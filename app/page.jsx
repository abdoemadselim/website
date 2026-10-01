import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';

export default function Home() {
  return (
    <>
      <canvas id="scene" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="top">
        <Hero />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
      <Experience />
    </>
  );
}
