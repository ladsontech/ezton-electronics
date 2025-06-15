
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Laptop2, Camera, Sun, Shield, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";

// Animated "shine" for the cards
function Shine() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="w-full h-full bg-gradient-to-tr from-white/10 via-white/0 to-white/10 rounded-2xl animate-[shine_2s_linear_infinite] opacity-80" />
      <style>
        {`@keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }`}
      </style>
    </div>
  );
}

// Techy animated background for cards
function TechBg() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 rounded-2xl"
      style={{ pointerEvents: 'none', zIndex: 0 }}>
      <defs>
        <linearGradient id="techbg" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#38bdf8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0.06" />
        </linearGradient>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0V24M0 24H24" stroke="#94a3b8" strokeWidth="0.7" opacity="0.13"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techbg)"/>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

const slides = [
  {
    icon: <Camera className="h-8 w-8 text-blue-500 drop-shadow-xl" />,
    title: "Smart Surveillance",
    desc: "AI-powered cameras, real-time cloud monitoring, and mobile alerts keep you confidently protected. ",
    highlights: ["Facial recognition", "Night vision", "Remote access"],
  },
  {
    icon: <Shield className="h-8 w-8 text-fuchsia-500 drop-shadow-lg" />,
    title: "Security Integration",
    desc: "Unified systems—alarms, sensors, and access—work in sync for end-to-end intelligent defense.",
    highlights: ["Motion detection", "Intruder alarm", "App control"],
  },
  {
    icon: <Sun className="h-8 w-8 text-yellow-400 drop-shadow-lg" />,
    title: "Solar Power Solutions",
    desc: "Reliable off-grid power: battery backups, solar panels & energy management for your security.",
    highlights: ["Green energy", "24/7 uptime", "Savings"],
  },
  {
    icon: <Network className="h-8 w-8 text-sky-400 drop-shadow" />,
    title: "Networking Tech",
    desc: "High-speed wired & wireless networks empower smart homes and safe businesses.",
    highlights: ["WiFi & Ethernet", "Secure VPN", "Seamless streaming"],
  },
  {
    icon: <Laptop2 className="h-8 w-8 text-violet-400 drop-shadow" />,
    title: "Remote Control",
    desc: "Manage and monitor your whole system on any device—anywhere in the world.",
    highlights: ["Mobile app", "Cloud dashboards", "Instant alerts"],
  }
];

const TechHeroCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  // Set up auto-slide using Embla API
  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext?.();
    }, 4000);

    // Pause auto-slide on hover (optional: if needed, add hover logic)
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative w-full max-w-2xl mx-auto animate-fade-in">
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem key={idx}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl shadow-xl bg-white/95 border border-primary/10 px-6 py-8 sm:px-10 min-h-[270px] flex flex-col transition-transform duration-500 hover:scale-[1.015]",
                  "before:absolute before:inset-0 before:rounded-2xl before:z-10 before:opacity-0 before:bg-gradient-to-r before:from-primary/10 before:to-primary/30 hover:before:opacity-70"
                )}
              >
                {/* Tech Gradient & Grid SVG */}
                <TechBg />
                {/* Shine */}
                <Shine />
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center gap-3">
                  <div className="mb-1">{slide.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 drop-shadow">{slide.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{slide.desc}</p>
                  <ul className="flex flex-wrap gap-2 justify-center mt-2">
                    {slide.highlights.map((h, i) => (
                      <li key={i} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold animate-fade-in" style={{ animationDelay: `${0.22 + i * 0.07}s`, animationFillMode: "forwards" }}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <CarouselPrevious className="shadow ring-1 ring-black/10 bg-white/70 hover:bg-primary/10" />
          </div>
          <div className="pointer-events-auto">
            <CarouselNext className="shadow ring-1 ring-black/10 bg-white/70 hover:bg-primary/10" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default TechHeroCarousel;
