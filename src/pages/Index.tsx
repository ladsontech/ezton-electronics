import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import WhatWeDo from '@/components/WhatWeDo';
import FeaturedProducts from '@/components/FeaturedProducts';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield } from 'lucide-react';

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
      <WhatWeDo />
      <FeaturedProducts />
      
      {/* Solutions link section - Reduced padding and improved design */}
      <section className="py-12 bg-gradient-to-r from-primary/5 via-blue-50 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Package className="w-4 h-4" />
                  Premium Solutions
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Complete Security Packages
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Discover our comprehensive range of security packages tailored to your needs, 
                  featuring advanced cameras and monitoring systems.
                </p>
                <Link 
                  to="/packages" 
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-base font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  View All Packages <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-blue-100 p-6 rounded-xl">
                    <Shield className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Gold Package</h3>
                    <p className="text-sm text-gray-600">Premium security with solar power</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-primary/10 p-6 rounded-xl mt-6">
                    <Shield className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold mb-2">Silver Package</h3>
                    <p className="text-sm text-gray-600">Essential protection systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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