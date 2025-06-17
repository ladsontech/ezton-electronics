
import { ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import TechHeroCarousel from "./TechHeroCarousel";

// Hero background image URL (now uses local hero1.jpeg)
const HERO_IMAGE_URL = "/images/hero1.jpeg";
const Hero = () => {
  return <section className="relative overflow-hidden rounded-2xl shadow-lg pb-8 pt-20 sm:pb-14 sm:pt-32 md:pt-44 md:pb-28 min-h-[600px] sm:min-h-[670px]">
      {/* Tech background image with blend and blur */}
      <div className="absolute inset-0 -z-30">
        <img src={HERO_IMAGE_URL} alt="Tech circuit background" className="w-full h-full object-cover object-top brightness-[.92] blur-[2px] sm:blur-sm" style={{
        filter: "brightness(0.92) saturate(1.08)"
      }} />
        {/* dark overlay to help text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/0 to-white/70" />
      </div>

      {/* Animated red blobs (glows) */}
      <div className="absolute top-[14%] left-1/4 w-32 h-24 sm:w-48 sm:h-36 bg-red-400/25 blur-3xl rounded-full -z-0 animate-pulse" />
      <div className="absolute right-5 bottom-16 w-40 h-28 sm:right-10 sm:bottom-24 sm:w-60 sm:h-44 bg-red-500/20 blur-2xl rounded-full -z-0 animate-pulse" />
      <div className="absolute left-2 bottom-2 w-16 h-8 sm:left-5 sm:bottom-4 sm:w-24 sm:h-12 bg-red-300/25 blur-xl rounded-full -z-0 animate-pulse" />

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Tagline badge */}
            <div className="inline-block animate-fade-in opacity-0" style={{
            animationDelay: "0.23s",
            animationFillMode: "forwards"
          }}>
              <span className="inline-flex items-center py-1 px-2 sm:px-3 text-xs sm:text-sm font-medium text-blue-600 bg-blue-100/95 rounded-full mb-4 sm:mb-6 shadow-md border border-blue-200/60 tracking-wide">
                Tech-driven Security Excellence
              </span>
            </div>

            {/* Main headline */}
            <h1 className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-black leading-tight mb-3 sm:mb-4 md:mb-8 opacity-0 animate-fade-in tracking-tight px-2")} style={{
            animationDelay: "0.33s",
            animationFillMode: "forwards",
            letterSpacing: "-0.01em"
          }}>
              <span style={{
              textShadow: "0 2px 10px #fff, 0 0px 22px #fff, 0 0px 2px #fafaff, 0 1.5px 0 #fff6"
            }} className="drop-shadow-[0_5px_18px_rgba(0,0,0,0.08)] hero-white-glow text-red-700">
                Safeguard Tomorrow, Today.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-500 font-normal mb-6 sm:mb-9 max-w-2xl mx-auto opacity-0 animate-fade-in px-4" style={{
            animationDelay: "0.43s",
            animationFillMode: "forwards",
            textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.6), 0 0px 2px rgba(0,0,0,0.9)"
          }}>
              <span className="inline-flex items-center justify-center space-x-2">
                <span className="h-px w-3 sm:w-4 bg-black"></span>
                <span className="text-slate-100">Quality with standards</span>
                <span className="h-px w-3 sm:w-4 bg-black text-2xl font-extrabold"></span>
              </span>
            </p>

            {/* Animated Tech Card Carousel */}
            <div className="mb-6 sm:mb-9 opacity-0 animate-fade-in px-2" style={{
            animationDelay: "0.6s",
            animationFillMode: "forwards"
          }}>
              <TechHeroCarousel />
            </div>

            {/* Animated CTA buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center animate-fade-in opacity-0 px-4" style={{
            animationDelay: "0.8s",
            animationFillMode: "forwards"
          }}>
              <a href={`https://wa.me/256778648157?text=${encodeURIComponent("Hello, I'm interested in getting a quote for your services.")}`} target="_blank" rel="noopener noreferrer" className="relative inline-block font-semibold rounded-lg px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-tr from-primary to-blue-500 text-white text-sm sm:text-base shadow-xl border border-white/10 transition-all hover:scale-105 hover:from-sky-600 hover:to-blue-600 focus:outline focus:outline-2 focus:outline-primary
                  before:absolute before:inset-0 before:bg-white/10 before:rounded-lg before:pointer-events-none before:opacity-0 hover:before:opacity-20">
                <span className="relative z-10">Get a Free Quote</span>
                <span className="absolute left-1/4 top-0 w-1/2 h-full pointer-events-none opacity-40" style={{
                background: "linear-gradient(120deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.52) 80%,rgba(255,255,255,0.04) 100%)",
                filter: "blur(4px)"
              }} />
              </a>
              <a href="#services" className="inline-block font-semibold rounded-lg px-6 py-2.5 sm:px-8 sm:py-3 bg-white border border-primary/20 text-primary text-sm sm:text-base shadow-md transition-all hover:bg-primary/10 hover:scale-105">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 sm:bottom-4 md:bottom-11 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{
        animationDelay: "1.2s",
        animationFillMode: "forwards"
      }}>
          <a href="#why-choose-us" className="flex items-center justify-center text-sm text-blue-700 hover:text-blue-800 transition-colors pointer-events-auto" aria-label="Scroll down">
            <ArrowDownCircle className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>;
};
export default Hero;
