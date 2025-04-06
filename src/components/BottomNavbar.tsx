
import { Link } from "react-router-dom";
import { Home, Package, Image, PhoneCall } from "lucide-react";

const BottomNavbar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        <Link 
          to="/" 
          className="flex flex-col items-center justify-center text-gray-600 hover:text-primary"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link 
          to="/solutions" 
          className="flex flex-col items-center justify-center text-gray-600 hover:text-primary"
        >
          <Package className="h-5 w-5" />
          <span className="text-xs mt-1">Solutions</span>
        </Link>
        <Link 
          to="/projects" 
          className="flex flex-col items-center justify-center text-gray-600 hover:text-primary"
        >
          <Image className="h-5 w-5" />
          <span className="text-xs mt-1">Projects</span>
        </Link>
        <Link 
          to="/contact" 
          className="flex flex-col items-center justify-center text-gray-600 hover:text-primary"
        >
          <PhoneCall className="h-5 w-5" />
          <span className="text-xs mt-1">Contact</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
