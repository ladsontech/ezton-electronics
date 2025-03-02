
import { useState, useEffect } from "react";
import { ArrowDownCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Actual images from the public/images directory
  const carouselImages = [
    "/images/hero1.jpeg",
    "/images/hero2.jpeg",
    "/images/hero3.jpeg"
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background elements - replacing blue tint with a neutral background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
      
      <div className="absolute inset-0 bg-grid -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
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
              className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            >
              Protecting what matters most with cutting-edge technology and professional installation services. Your security is our priority.
            </p>
            
            {/* Image Carousel */}
            <div 
              className="relative mx-auto mb-10 max-w-3xl rounded-xl overflow-hidden shadow-lg opacity-0 animate-fade-in"
              style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
            >
              <div className="relative aspect-video bg-gray-100">
                {carouselImages.map((image, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <img 
                      src={image} 
                      alt={`Security solution showcase ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Navigation Arrows */}
                <button 
                  onClick={goToPrevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md transition-colors hover:bg-white z-10"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-800" />
                </button>
                
                <button 
                  onClick={goToNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md transition-colors hover:bg-white z-10"
                  aria-label="Next slide"
                >
                  <ArrowRight className="h-5 w-5 text-gray-800" />
                </button>
                
                {/* Slide indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        currentSlide === index ? "bg-white" : "bg-white/50"
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
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
