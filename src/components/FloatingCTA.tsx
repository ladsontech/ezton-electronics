
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, X } from "lucide-react";

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
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div 
          className={cn(
            "bg-white rounded-lg shadow-lg mb-4 w-80 overflow-hidden",
            "animate-slide-up"
          )}
        >
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold">Contact Us</h3>
            <button 
              onClick={toggleOpen}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about our products or services? Get in touch with us!
            </p>
            <a 
              href="#contact" 
              className="block text-center py-2 px-4 rounded-lg font-medium transition-colors w-full bg-primary text-white hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              Send a Message
            </a>
          </div>
        </div>
      )}
      
      <button
        onClick={toggleOpen}
        className={cn(
          "bg-primary text-white rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors",
          isOpen ? "animate-pulse" : "animate-bounce"
        )}
        aria-label="Contact us"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingCTA;
