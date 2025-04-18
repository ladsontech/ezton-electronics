
import { useState, useEffect } from "react";
import { Menu, X, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when changing route
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [window.location.pathname]);

  const whatsappNumber = "+256778648157";
  const whatsappMessage = "Hello, I'm interested in your services.";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white", 
      isScrolled ? "shadow-md" : "")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 h-16">
          {/* Mobile Menu Toggle - Left */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Logo and Text - Centered on mobile */}
          <Link to="/" className={cn("flex items-center", isMobile ? "absolute left-1/2 transform -translate-x-1/2" : "")}>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 mb-0.5">
                <img 
                  src="/images/ezton_logo.png" 
                  alt="Ezton Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="text-center">
                <h2 className="text-sm font-heading font-bold text-black">
                  Ezton E&E Ltd
                </h2>
                <div className="flex items-center justify-center space-x-1">
                  <div className="h-px w-3 bg-black"></div>
                  <span className="text-xs text-red-600 italic">
                    Quality with standards
                  </span>
                  <div className="h-px w-3 bg-black"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Empty div for mobile layout balance */}
          <div className="w-10 md:hidden"></div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav className="flex space-x-6 lg:space-x-8">
              <Link to="/" className="nav-link text-gray-800 hover:text-primary py-2">Home</Link>
              <Link to="/solutions" className="nav-link text-gray-800 hover:text-primary py-2">Products</Link>
              <Link to="/projects" className="nav-link text-gray-800 hover:text-primary py-2">Projects</Link>
              <Link to="/contact" className="nav-link text-gray-800 hover:text-primary py-2">Contact</Link>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Fixed Height with Overflow */}
      <div 
        className={cn(
          "md:hidden fixed top-16 left-0 right-0 bg-white shadow-md transition-transform duration-300 ease-in-out z-50",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          <Link to="/" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/solutions" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link to="/projects" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Projects</Link>
          <Link to="/contact" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block py-2 btn-primary text-center mt-3" onClick={() => setIsMenuOpen(false)}>
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
