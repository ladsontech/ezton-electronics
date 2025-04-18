
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = "Ezton E & E Ltd. - Security & Electrical Solutions";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Services />
      
      {/* Solutions link section */}
      <section className="py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Premium Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore Our Security Packages</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover our comprehensive range of security packages tailored to your needs, featuring advanced cameras and monitoring systems.
          </p>
          <Link to="/solutions" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-base font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md">
            View All Packages <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
      
      <ContactSection />
      <Footer />
      <FloatingCTA />
      <BottomNavbar />
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Index;
