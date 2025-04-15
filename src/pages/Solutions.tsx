
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

const Solutions = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update document title
    document.title = "Ezton E & E Ltd. - Products";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of security and electrical products, from surveillance cameras to solar energy solutions.
            </p>
          </div>
        </div>
        <Products />
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
