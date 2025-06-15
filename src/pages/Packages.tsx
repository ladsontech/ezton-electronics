
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Packages from '@/components/Packages';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function PackagesPage() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "Ezton E & E Ltd. - Security Packages";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 md:pt-32">
        <Packages />
      </div>
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      <div className="md:hidden h-16"></div>
    </div>
  );
}
