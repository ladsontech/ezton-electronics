
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Packages from '@/components/Packages';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update document title
    document.title = "Ezton E & E Ltd. - Security & Electrical Solutions";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <div id="solutions" className="bg-white">
        <Services />
        <Products />
        <Packages />
      </div>
      <ContactSection />
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      {/* Add padding at the bottom for mobile to account for bottom navbar */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Index;
