
import { Camera, Sun, Lock, Network, Shield, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Surveillance Systems",
    description: "Advanced CCTV and PTZ camera installations for comprehensive security coverage.",
    icon: Camera,
  },
  {
    title: "Solar Solutions",
    description: "Sustainable energy systems for powering security equipment and lighting.",
    icon: Sun,
  },
  {
    title: "Security Integration",
    description: "Seamless integration of various security components for optimal protection.",
    icon: Shield,
  },
  {
    title: "Network Solutions",
    description: "High-speed networking and connectivity solutions for security systems.",
    icon: Network,
  },
  {
    title: "Access Control",
    description: "Advanced access control systems for restricted area management.",
    icon: Lock,
  },
  {
    title: "Maintenance",
    description: "Regular maintenance and support services for all security installations.",
    icon: Settings,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative bg-white">
      <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive security and electrical solutions tailored to your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={cn(
                "feature-card group hover-lift",
                "opacity-0 animate-fade-in"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More →
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
