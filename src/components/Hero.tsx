
import { ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import TechHeroCarousel from "./TechHeroCarousel";

const Hero = () => {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden rounded-2xl">
      {/* Tech-inspired animated grid background */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {/* Animated grid lines */}
        <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-blue-50/90 to-white opacity-95"></div>
        <svg className="absolute inset-0 w-full h-full" width="100%" height="100%">
          <defs>
            <pattern id="bggrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#bae6fd" strokeWidth="0.7" opacity="0.23"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bggrid)" />
        </svg>
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-b from-sky-300/40 via-transparent to-transparent rounded-full blur-2xl opacity-40"></div>
        {/* Bottom neon-blue glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-28 bg-gradient-to-t from-blue-400/30 via-transparent to-transparent rounded-full blur-3xl opacity-25"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-fade-in opacity-0" style={{
              animationDelay: "0.25s",
              animationFillMode: "forwards"
            }}>
              <span className="inline-flex items-center py-1 px-3 text-sm font-medium text-sky-600 bg-sky-100 rounded-full mb-5 shadow">
                Security Technology
              </span>
            </div>
            <h1 className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-4 md:mb-7 opacity-0 animate-fade-in")}
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}>
              <span className="text-gradient bg-gradient-to-r from-sky-500 via-fuchsia-500 to-blue-700 bg-clip-text text-transparent drop-shadow">
                Safeguard the Future, Powered by Innovation
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "0.44s", animationFillMode: "forwards" }}>
              Professional security camera installations, smart integration, green energy, and real-time tech—experience a new standard in protection.
            </p>

            {/* Animated Tech Card Carousel */}
            <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.59s", animationFillMode: "forwards" }}>
              <TechHeroCarousel />
            </div>

            {/* Animated CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in opacity-0"
              style={{ animationDelay: "0.74s", animationFillMode: "forwards" }}>
              <a href={`https://wa.me/256778648157?text=${encodeURIComponent("Hello, I'm interested in getting a quote for your services.")}`}
                 target="_blank" rel="noopener noreferrer"
                 className="relative inline-block font-semibold rounded-lg px-7 py-3 bg-gradient-to-tr from-primary to-blue-500 text-white shadow-lg 
                 border border-white/10 transition-all hover:scale-105 hover:from-sky-600 hover:to-blue-600 focus:outline focus:outline-2 focus:outline-primary
                 before:absolute before:inset-0 before:bg-white/10 before:rounded-lg before:pointer-events-none before:opacity-0 hover:before:opacity-20
                 ">
                <span className="relative z-10">Get a Free Quote</span>
                {/* Shine animation */}
                <span className="absolute left-1/4 top-0 w-1/2 h-full pointer-events-none opacity-40" style={{
                  background: "linear-gradient(120deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.55) 80%,rgba(255,255,255,0.04) 100%)",
                  filter: "blur(4px)"
                }} />
              </a>
              <a href="#services"
                 className="inline-block font-semibold rounded-lg px-7 py-3 bg-white border border-primary/20 text-primary shadow transition-all hover:bg-primary/10 hover:scale-105">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 sm:bottom-9 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
          <a href="#why-choose-us" className="flex items-center justify-center text-sm text-sky-700 hover:text-primary transition-colors pointer-events-auto"
            aria-label="Scroll down">
            <ArrowDownCircle className="h-8 w-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
