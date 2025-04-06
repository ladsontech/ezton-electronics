
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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

  // WhatsApp information
  const whatsappNumber = "+256778648157";
  const whatsappMessage = "Hello, I'm interested in your services.";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white", 
      isScrolled ? "shadow-md" : "")}>
      <div className="flex flex-col md:flex-row">
        {/* Logo section with clean white background */}
        <div className="w-full md:w-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
            <div className="flex justify-between items-center py-3 md:py-4 bg-white">
              <div className="flex items-center">
                <Link to="/" className="flex flex-col">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                      <img src="/images/ezton_logo.png" alt="Ezton Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-slate-800 font-extrabold">
                      <span className="text-red-700 font-bold">Ezton</span>
                      <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"> E & E Ltd.</span>
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 ml-8 text-center italic">
                    Quality with Standards
                  </span>
                </Link>
              </div>
              
              {/* Only show menu button on desktop, not mobile since we have bottom nav */}
              {!isMobile && (
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-800" aria-label="Toggle menu">
                  {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Menu section with white background */}
        <div className="hidden md:block bg-white flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
            {/* Desktop Navigation */}
            <nav className="flex space-x-6 lg:space-x-8">
              <Link to="/" className="nav-link text-gray-800 hover:text-primary py-4">Home</Link>
              <Link to="/solutions" className="nav-link text-gray-800 hover:text-primary py-4">Solutions</Link>
              <Link to="/projects" className="nav-link text-gray-800 hover:text-primary py-4">Projects</Link>
              <Link to="/contact" className="nav-link text-gray-800 hover:text-primary py-4">Contact</Link>
            </nav>
            
            <div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Only show mobile menu if menu is open */}
      <div className={cn("md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white", 
        isMenuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0")}>
        <div className="px-4 pb-4 pt-2 space-y-2">
          <Link to="/" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/solutions" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Solutions</Link>
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
