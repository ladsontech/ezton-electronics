
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Packages from '@/components/Packages';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductsPage = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = "Ezton E & E Ltd. - Products & Packages";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 md:pt-32">
        <Products />
        <Packages />
      </div>
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default ProductsPage;
