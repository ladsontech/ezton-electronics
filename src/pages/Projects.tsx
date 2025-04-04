
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProjectGallery from '@/components/ProjectGallery';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';

const Projects = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update document title
    document.title = "Projects - Ezton E & E Ltd.";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of successfully completed installations and security solutions.
            </p>
          </div>
        </div>
        <ProjectGallery />
      </div>
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      {/* Add padding at the bottom for mobile to account for bottom navbar */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Projects;
