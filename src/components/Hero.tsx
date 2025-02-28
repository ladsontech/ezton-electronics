
import { ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background elements - replacing blue tint with a neutral background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
      
      <div className="absolute inset-0 bg-grid -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Logo and company name container */}
          <div className="flex items-center justify-center mb-8 animate-fade-in opacity-0" 
               style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <div className="mr-4">
              {/* Company logo - using a placeholder shield icon */}
              <div className="bg-primary text-white p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                Ezton E & E
              </h2>
              <p className="text-sm text-muted-foreground">Quality with Standards</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <span className="inline-flex items-center py-1 px-3 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6">
                Security Technology
              </span>
            </div>
            
            <h1 
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight mb-6",
                "opacity-0 animate-fade-in"
              )}
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              Advanced <span className="text-gradient">Security</span> & <span className="text-gradient">Electrical</span> Solutions
            </h1>
            
            <p 
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            >
              Protecting what matters most with cutting-edge technology and professional installation services. Your security is our priority.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
              style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
            >
              <a href="#contact" className="btn-primary">
                Get a Free Quote
              </a>
              <a href="#services" className="btn-outline">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
        >
          <a 
            href="#why-choose-us" 
            className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDownCircle className="h-8 w-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
