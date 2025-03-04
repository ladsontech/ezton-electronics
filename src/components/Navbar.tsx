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
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-slate-800/95 backdrop-blur-md shadow-md" : "bg-slate-800")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-neutral-400">
        <div className="flex justify-between items-center py-3 md:py-4">
          <div className="flex items-center">
            <a href="#" className="flex flex-col">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  <img src="/images/ezton_logo.png" alt="Ezton Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white">
                  <span className="text-red-700">Ezton</span> E & E Ltd.
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-300 ml-8">
                Quality with Standards
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <a href="#services" className="nav-link text-gray-200 hover:text-white">Services</a>
            <a href="#products" className="nav-link text-gray-200 hover:text-white">Products</a>
            <a href="#packages" className="nav-link text-gray-200 hover:text-white">Packages</a>
            <a href="#projects" className="nav-link text-gray-200 hover:text-white">Projects</a>
            <a href="#contact" className="nav-link text-gray-200 hover:text-white">Contact</a>
          </nav>
          
          <div className="hidden md:block">
            <a href={`https://wa.me/256778648157?text=${encodeURIComponent("Hello, I'm interested in your services.")}`} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
              Get Started
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white" aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("md:hidden overflow-hidden transition-all duration-300 ease-in-out", isMenuOpen ? "max-h-96 border-t border-slate-700" : "max-h-0")}>
        <div className="px-4 pb-4 pt-2 space-y-2 bg-slate-800/95 backdrop-blur-md">
          <a href="#services" className="block py-2 text-gray-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#products" className="block py-2 text-gray-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Products</a>
          <a href="#packages" className="block py-2 text-gray-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Packages</a>
          <a href="#projects" className="block py-2 text-gray-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#contact" className="block py-2 text-gray-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a href={`https://wa.me/256778648157?text=${encodeURIComponent("Hello, I'm interested in your services.")}`} target="_blank" rel="noopener noreferrer" className="block py-2 btn-primary text-center mt-3" onClick={() => setIsMenuOpen(false)}>
            Get Started
          </a>
        </div>
      </div>
    </header>;
};
export default Navbar;