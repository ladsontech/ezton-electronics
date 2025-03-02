
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, X } from "lucide-react";

// WhatsApp number 
const whatsappNumber = "+256778648157";
const whatsappMessage = "Hello, I'm interested in your services and would like more information.";
const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div 
          className={cn(
            "bg-white rounded-lg shadow-lg mb-3 sm:mb-4 w-[calc(100vw-2rem)] sm:w-80 max-w-[320px] overflow-hidden",
            "animate-slide-up"
          )}
        >
          <div className="bg-primary p-3 sm:p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold">Contact Us</h3>
            <button 
              onClick={toggleOpen}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-3 sm:p-4">
            <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
              Have questions about our products or services? Get in touch with us!
            </p>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 px-4 rounded-lg font-medium transition-colors w-full bg-primary text-white hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
      
      <button
        onClick={toggleOpen}
        className={cn(
          "bg-primary text-white rounded-full p-3 sm:p-4 shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors",
          isOpen ? "animate-pulse" : "animate-bounce"
        )}
        aria-label="Contact us"
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};

export default FloatingCTA;
