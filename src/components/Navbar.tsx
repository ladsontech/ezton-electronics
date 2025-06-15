
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

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
      isScrolled ? "shadow-md" : ""
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-2 h-16">
          {/* Empty flex item for left space (desktop only) */}
          <div className="hidden md:block md:w-1/4" />

          {/* Logo + Text section, always centered */}
          <Link
            to="/"
            className={cn(
              "flex items-center absolute left-1/2 transform -translate-x-1/2",
              isMobile ? "static left-auto transform-none mx-auto" : ""
            )}
            style={{ minWidth: 0, zIndex: 10 }}
          >
            <div className="flex flex-col items-center mt-2 space-y-0.5">
              <div className="w-8 h-8">
                <img src="/images/ezton_logo.png" alt="Ezton Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-center leading-tight">
                <h2 className="text-sm font-heading font-bold text-black leading-snug mb-0">
                  Ezton E&E Ltd
                </h2>
                <div className="flex items-center justify-center space-x-1 mt-0">
                  <div className="h-px w-3 bg-black"></div>
                  <span className="text-xs text-red-600 italic leading-none">
                    Quality with standards
                  </span>
                  <div className="h-px w-3 bg-black"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - absolutely right-aligned for centering logo */}
          <div className="hidden md:flex absolute right-0 top-0 h-full items-center">
            <nav className="flex space-x-6 lg:space-x-8 h-full items-center">
              <Link to="/" className="nav-link text-gray-800 hover:text-primary py-2">Home</Link>
              <Link to="/solutions" className="nav-link text-gray-800 hover:text-primary py-2">Products</Link>
              <Link to="/projects" className="nav-link text-gray-800 hover:text-primary py-2">Projects</Link>
              <Link to="/contact" className="nav-link text-gray-800 hover:text-primary py-2">Contact</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
