
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
    document.title = "Ezton E & E Ltd. - Security Solutions";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 md:pt-32">
        <Products />
      </div>
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Solutions;
