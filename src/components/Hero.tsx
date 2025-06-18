import { ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import TechHeroCarousel from "./TechHeroCarousel";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-20 md:py-28 min-h-[600px] sm:min-h-[670px]">
      {/* Background Image - More Visible */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25" style={{
      backgroundImage: "url('/images/hero1.jpeg')"
    }} />
      
      {/* Clean background with subtle pattern */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Lighter gradient overlay for more visible background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20" />

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Tagline badge */}
            

            {/* Main headline */}
            <h1 className={cn("text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-black leading-tight mb-6 opacity-0 animate-fade-in tracking-tight text-gray-900")} style={{
            animationDelay: "0.33s",
            animationFillMode: "forwards"
          }}>
              Safeguard Tomorrow, Today.
            </h1>

            {/* Supporting paragraph */}
            <p className="text-lg sm:text-xl text-gray-600 font-normal mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{
            animationDelay: "0.43s",
            animationFillMode: "forwards"
          }}>
              <span className="inline-flex items-center justify-center space-x-3 text-rose-700">
                <span className="h-px w-8 bg-gray-300"></span>
                <span>Quality with standards</span>
                <span className="h-px w-8 bg-gray-300"></span>
              </span>
            </p>

            {/* Animated Tech Card Carousel */}
            <div className="mb-8 opacity-0 animate-fade-in" style={{
            animationDelay: "0.6s",
            animationFillMode: "forwards"
          }}>
              <TechHeroCarousel />
            </div>

            {/* Clean CTA buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center animate-fade-in opacity-0" style={{
            animationDelay: "0.8s",
            animationFillMode: "forwards"
          }}>
              <a href={`https://wa.me/256778648157?text=${encodeURIComponent("Hello, I'm interested in getting a quote for your services.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center font-semibold rounded-lg px-8 py-3 bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105">
                Get a Free Quote
              </a>
              <a href="#services" className="inline-flex items-center justify-center font-semibold rounded-lg px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 transition-all hover:border-primary hover:text-primary hover:scale-105">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{
        animationDelay: "1.2s",
        animationFillMode: "forwards"
      }}>
          <a href="#why-choose-us" className="flex items-center justify-center text-gray-500 hover:text-primary transition-colors" aria-label="Scroll down">
            <ArrowDownCircle className="h-8 w-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>;
};
export default Hero;