
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
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
    // Update document title
    document.title = "Ezton E & E Ltd. - Security & Electrical Solutions";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      
      {/* Solutions link section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore Our Solutions</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover our comprehensive range of security cameras, solar systems, and smart technology solutions.
          </p>
          <Link to="/solutions" className="btn-primary inline-flex items-center gap-2">
            View All Solutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      
      <ContactSection />
      <Footer />
      <FloatingCTA />
      <BottomNavbar />
      {/* Add padding at the bottom for mobile to account for bottom navbar */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Index;
