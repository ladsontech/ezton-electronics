
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
  
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <a href="#" className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8">
                  <img src="/images/ezton_logo.png" alt="Ezton Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl md:text-2xl font-heading font-bold">
                  <span className="text-red-700">Ezton</span> E & E Ltd.
                </span>
              </div>
              <span className="text-xs text-muted-foreground ml-8">
                Quality with Standards
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="nav-link">Services</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#packages" className="nav-link">Packages</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          
          <div className="hidden md:block">
            <a href="#contact" className="btn-primary">
              Get Started
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground" aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("md:hidden overflow-hidden transition-all duration-300 ease-in-out", isMenuOpen ? "max-h-96 border-t border-border/40" : "max-h-0")}>
        <div className="px-4 pb-5 pt-2 space-y-3 bg-background/95 backdrop-blur-md">
          <a href="#services" className="block py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#products" className="block py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Products</a>
          <a href="#packages" className="block py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Packages</a>
          <a href="#projects" className="block py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#contact" className="block py-2 nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href="#contact" className="block py-2 btn-primary text-center mt-4" onClick={() => setIsMenuOpen(false)}>
            Get Started
          </a>
        </div>
      </div>
    </header>;
};

export default Navbar;
