
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

  const whatsappNumber = "+256778648157";
  const whatsappMessage = "Hello, I'm interested in your services.";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white", 
      isScrolled ? "shadow-md" : "")}>
      <div className="flex flex-col">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
            <div className="flex flex-col items-center py-3 md:py-4 bg-white">
              <Link to="/" className="flex flex-col items-center">
                <div className="w-16 h-16 mb-2">
                  <img 
                    src="/images/ezton_logo.png" 
                    alt="Ezton Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-heading font-bold">
                    <span className="text-black">Ezton E&E Ltd</span>
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <div className="h-px w-8 bg-black"></div>
                    <span className="text-sm text-red-600 italic">
                      Quality with standards
                    </span>
                    <div className="h-px w-8 bg-black"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <nav className="flex space-x-6 lg:space-x-8">
              <Link to="/" className="nav-link text-gray-800 hover:text-primary py-4">Home</Link>
              <Link to="/solutions" className="nav-link text-gray-800 hover:text-primary py-4">Solutions</Link>
              <Link to="/projects" className="nav-link text-gray-800 hover:text-primary py-4">Projects</Link>
              <Link to="/contact" className="nav-link text-gray-800 hover:text-primary py-4">Contact</Link>
            </nav>
          </div>
        </div>
      </div>
      
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
