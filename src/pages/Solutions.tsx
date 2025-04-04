
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Packages from '@/components/Packages';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

const Solutions = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update document title
    document.title = "Ezton E & E Ltd. - Security Solutions";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Solutions</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive security and electrical solutions tailored to your needs, from surveillance systems to solar energy solutions.
            </p>
          </div>
        </div>
        <Services />
        <Products />
        <Packages />
      </div>
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      {/* Add padding at the bottom for mobile to account for bottom navbar */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Solutions;
