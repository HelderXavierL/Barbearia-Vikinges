// =============================================
// Barbearia Vikings — Home Page
// =============================================

import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { Barbers } from '../sections/Barbers';
import { Benefits } from '../sections/Benefits';
import { Products } from '../sections/Products';
import { FAQ } from '../sections/FAQ';
import { Contact } from '../sections/Contact';

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Barbers />
        <Benefits />
        <Products />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
