
import { ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import TechHeroCarousel from "./TechHeroCarousel";

// Hero background image URL (now uses local hero1.jpeg)
const HERO_IMAGE_URL = "/images/hero1.jpeg";
const Hero = () => {
  return <section className="relative overflow-hidden rounded-2xl shadow-lg pb-14 pt-32 sm:pt-36 md:pt-44 md:pb-28 min-h-[670px] sm:min-h-[600px]">
      {/* Tech background image with blend and blur */}
      <div className="absolute inset-0 -z-30">
        <img src={HERO_IMAGE_URL} alt="Tech circuit background" className="w-full h-full object-cover object-top brightness-[.92] blur-[2px] sm:blur-sm" style={{
        filter: "brightness(0.92) saturate(1.08)"
      }} />
        {/* dark overlay to help text pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/0 to-white/70" />
      </div>
      {/* Removed Techy animated SVG (network/circuit) */}
      {/* Animated colored blobs (glows) */}
      <div className="absolute top-[14%] left-1/4 w-48 h-36 bg-sky-400/25 blur-3xl rounded-full -z-0 animate-pulse" />
      <div className="absolute right-10 bottom-24 w-60 h-44 bg-fuchsia-400/25 blur-2xl rounded-full -z-0 animate-pulse" />
      <div className="absolute left-5 bottom-4 w-24 h-12 bg-yellow-300/25 blur-xl rounded-full -z-0 animate-pulse" />

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            {/* Tagline badge */}
            <div className="inline-block animate-fade-in opacity-0" style={{
            animationDelay: "0.23s",
            animationFillMode: "forwards"
          }}>
              <span className="inline-flex items-center py-1 px-3 text-sm font-medium text-blue-600 bg-blue-100/95 rounded-full mb-6 shadow-md border border-blue-200/60 tracking-wide">
                Tech-driven Security Excellence
              </span>
            </div>
            {/* Main headline */}
            <h1 className={cn("text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-black leading-tight mb-4 md:mb-8 opacity-0 animate-fade-in tracking-tight")} style={{
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
            <p className="text-lg sm:text-xl md:text-2xl text-red-600 font-normal mb-9 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{
            animationDelay: "0.43s",
            animationFillMode: "forwards",
            textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.6), 0 0px 2px rgba(0,0,0,0.9)"
          }}>
              Quality with standards
            </p>

            {/* Animated Tech Card Carousel */}
            <div className="mb-9 opacity-0 animate-fade-in" style={{
            animationDelay: "0.6s",
            animationFillMode: "forwards"
          }}>
              <TechHeroCarousel />
            </div>

            {/* Animated CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in opacity-0" style={{
            animationDelay: "0.8s",
            animationFillMode: "forwards"
          }}>
              <a href={`https://wa.me/256778648157?text=${encodeURIComponent("Hello, I'm interested in getting a quote for your services.")}`} target="_blank" rel="noopener noreferrer" className="relative inline-block font-semibold rounded-lg px-8 py-3 bg-gradient-to-tr from-primary to-blue-500 text-white shadow-xl border border-white/10 transition-all hover:scale-105 hover:from-sky-600 hover:to-blue-600 focus:outline focus:outline-2 focus:outline-primary
                 before:absolute before:inset-0 before:bg-white/10 before:rounded-lg before:pointer-events-none before:opacity-0 hover:before:opacity-20">
                <span className="relative z-10">Get a Free Quote</span>
                <span className="absolute left-1/4 top-0 w-1/2 h-full pointer-events-none opacity-40" style={{
                background: "linear-gradient(120deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.52) 80%,rgba(255,255,255,0.04) 100%)",
                filter: "blur(4px)"
              }} />
              </a>
              <a href="#services" className="inline-block font-semibold rounded-lg px-8 py-3 bg-white border border-primary/20 text-primary shadow-md transition-all hover:bg-primary/10 hover:scale-105">
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-11 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{
        animationDelay: "1.2s",
        animationFillMode: "forwards"
      }}>
          <a href="#why-choose-us" className="flex items-center justify-center text-sm text-blue-700 hover:text-blue-800 transition-colors pointer-events-auto" aria-label="Scroll down">
            <ArrowDownCircle className="h-8 w-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>;
};
export default Hero;
