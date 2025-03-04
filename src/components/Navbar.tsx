import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white", isScrolled ? "shadow-md" : "")}>
      <div className="flex flex-col md:flex-row">
        {/* Logo section with white background */}
        <div className="w-full md:w-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="flex justify-between items-center py-3 md:py-4 bg-gradient-to-r from-sky-100 to-sky-200 rounded-lg shadow-sm bg-transparent">
              <div className="flex items-center">
                <a href="#" className="flex flex-col">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 p-1 rounded-full shadow-sm bg-stone-500">
                      <img src="/images/ezton_logo.png" alt="Ezton Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl font-heading text-slate-800 font-extrabold">
                      <span className="text-red-700 font-bold px-1 rounded bg-white/30 backdrop-blur-sm shadow-sm">Ezton</span>
                      <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"> E & E Ltd.</span>
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 ml-8 text-center italic">
                    Quality with Standards
                  </span>
                </a>
              </div>
              
              {/* Mobile menu button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-800" aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Menu section with white background */}
        <div className="hidden md:block bg-white flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
            {/* Desktop Navigation */}
            <nav className="flex space-x-6 lg:space-x-8">
              <a href="#services" className="nav-link text-gray-800 hover:text-primary py-4">Services</a>
              <a href="#products" className="nav-link text-gray-800 hover:text-primary py-4">Products</a>
              <a href="#packages" className="nav-link text-gray-800 hover:text-primary py-4">Packages</a>
              <a href="#projects" className="nav-link text-gray-800 hover:text-primary py-4">Projects</a>
              <a href="#contact" className="nav-link text-gray-800 hover:text-primary py-4">Contact</a>
            </nav>
            
            <div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white", isMenuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0")}>
        <div className="px-4 pb-4 pt-2 space-y-2">
          <a href="#services" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#products" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Products</a>
          <a href="#packages" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Packages</a>
          <a href="#projects" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#contact" className="block py-2 text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block py-2 btn-primary text-center mt-3" onClick={() => setIsMenuOpen(false)}>
            Get Started
          </a>
        </div>
      </div>
    </header>;
};
export default Navbar;