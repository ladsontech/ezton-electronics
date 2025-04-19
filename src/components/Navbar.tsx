import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white", isScrolled ? "shadow-md" : "")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 h-16">
          {/* Logo and Text - Centered on mobile, left-aligned on desktop */}
          <Link to="/" className={cn("flex items-center", isMobile ? "mx-auto" : "")}>
            <div className="flex flex-col items-center my-[20px] py-[5px]">
              <div className="w-8 h-8 mb-0.5">
                <img src="/images/ezton_logo.png" alt="Ezton Logo" className="w-full h-full object-contain" />
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
    </header>;
};
export default Navbar;