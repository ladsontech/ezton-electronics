import { Sun, Lock, Network, Shield, Settings, Cctv } from "lucide-react";
import { cn } from "@/lib/utils";
import * as React from "react";

// Use Cctv icon for Surveillance Systems
const services = [
  {
    title: "Surveillance Systems",
    description: "Advanced CCTV and PTZ camera installations for comprehensive security coverage.",
    icon: Cctv,
    color: "from-blue-400 via-sky-400 to-blue-700"
  },
  {
    title: "Solar Solutions",
    description: "Sustainable energy systems for powering security equipment and lighting.",
    icon: Sun,
    color: "from-yellow-300 via-yellow-400 to-orange-400"
  },
  {
    title: "Security Integration",
    description: "Seamless integration of various security components for optimal protection.",
    icon: Shield,
    color: "from-purple-400 via-fuchsia-400 to-sky-400"
  },
  {
    title: "Network Solutions",
    description: "High-speed networking and connectivity solutions for security systems.",
    icon: Network,
    color: "from-primary via-blue-500 to-sky-400"
  },
  {
    title: "Access Control",
    description: "Advanced access control systems for restricted area management.",
    icon: Lock,
    color: "from-slate-400 via-primary to-blue-500"
  },
  {
    title: "Maintenance",
    description: "Regular maintenance and support services for all security installations.",
    icon: Settings,
    color: "from-gray-300 via-primary to-gray-400"
  },
];

// Styled/animated card component
const ServiceCard = ({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  index: number;
}) => (
  <div
    className={cn(
      "relative group bg-white/70 backdrop-blur-xl border border-primary/10 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-transform duration-300",
      "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:z-10",
      "hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl before:opacity-0 hover:before:opacity-100",
      "hover:before:bg-gradient-to-r hover:before:from-primary/5 hover:before:via-blue-300/10 hover:before:to-fuchsia-300/10",
      "feature-card"
    )}
    style={{
      animationDelay: `${0.1 + index * 0.1}s`,
      animationFillMode: "forwards"
    }}
  >
    {/* Animated Glow border on hover */}
    <span
      className={cn(
        "pointer-events-none absolute inset-0 rounded-2xl z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
      )}
      aria-hidden
      style={{
        boxShadow:
          "0 0 0 0px #fff0, 0 0 50px 4px #3b82f640, 0 0 16px 2px #818cf880",
        transition: "opacity 0.3s",
      }}
    />
    {/* Icon with animated gradient/glow */}
    <div
      className={cn(
        "relative mx-auto mb-5 mt-8 size-16 flex items-center justify-center rounded-full shadow-xl z-10",
        "bg-gradient-to-tr",
        color
      )}
      style={{
        boxShadow:
          "0 0 0 3px #fff, 0 6px 24px 0px rgba(60,180,250,0.22)",
        animation: `card-pop 0.7s cubic-bezier(.32,1.92,.22,.91) forwards`,
        animationDelay: `${0.12 + index * 0.11}s`,
      }}
    >
      <Icon className="size-8 text-white drop-shadow-lg filter-[brightness(1.15)] group-hover:scale-110 transition-transform duration-300" />
    </div>
    {/* Card content */}
    <div className="px-6 pb-6 flex flex-col flex-1 items-center text-center z-10 relative min-h-[120px]">
      <h3 className="text-lg md:text-xl font-bold text-primary drop-shadow mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[98%] break-words leading-relaxed" style={{ wordBreak: 'break-word' }}>
        {description}
      </p>
    </div>
    {/* Shine animation */}
    <span className="absolute inset-0 z-30 pointer-events-none rounded-2xl overflow-hidden">
      <span className="absolute -top-1/4 left-0 w-3/4 h-1/2 bg-gradient-to-r from-white/80 via-white/30 to-white/5 blur-2xl opacity-30 rotate-12 animate-[shine-card_2.3s_linear_infinite]" />
    </span>
    <style>{`
      @keyframes card-pop {
        0% { transform: translateY(30px) scale(0.95); opacity: 0; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes shine-card {
        0% {
          transform: translateX(-120%) skewX(-12deg);
        }
        70% {
          transform: translateX(140%) skewX(-12deg);
        }
        100% {
          transform: translateX(140%) skewX(-12deg);
        }
      }
    `}</style>
  </div>
);

const Services = () => {
  return (
    <section id="services" className="py-12 md:py-16 relative bg-white">
      <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive security and electrical solutions tailored to your needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;