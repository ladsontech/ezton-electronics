
import { Link } from "react-router-dom";
import { Home, Package, Image, PhoneCall } from "lucide-react";

const BottomNavbar = () => {
  // WhatsApp information for the contact button
  const whatsappNumber = "+256778648157";
  const whatsappMessage = "Hello, I'm interested in your services.";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

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
        <a 
          href={whatsappLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-gray-600 hover:text-primary"
        >
          <PhoneCall className="h-5 w-5" />
          <span className="text-xs mt-1">Contact</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavbar;
