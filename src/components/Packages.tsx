
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const packages = [
  {
    title: "5-Star Gold Package",
    price: "UGX 1,700,000",
    featured: true,
    features: [
      "2,300W floodlights",
      "3-in-1 PTZ solar camera",
      "20ft/5M pole",
      "Anti-climbers",
      "Full installation",
      "1-year guarantee"
    ]
  },
  {
    title: "Gold Package",
    price: "UGX 1,500,000",
    featured: false,
    features: [
      "2,300W floodlights",
      "2-in-1 PTZ solar camera",
      "20ft/5M pole",
      "Anti-climbers",
      "Full installation",
      "1-year guarantee"
    ]
  },
  {
    title: "Silver Package",
    price: "UGX 1,250,000",
    featured: false,
    features: [
      "1,300W solar floodlights",
      "2-in-1 PTZ solar camera",
      "20ft/5M pole",
      "Anti-climbers",
      "Full installation",
      "1-year guarantee"
    ]
  },
  {
    title: "Bronze Package",
    price: "UGX 1,000,000",
    featured: false,
    features: [
      "1,300W floodlights",
      "Single-view 360° PTZ solar camera",
      "20ft/5M pole",
      "Anti-climbers",
      "Full installation",
      "1-year guarantee"
    ]
  },
  {
    title: "Diamond Package",
    price: "UGX 900,000",
    featured: false,
    features: [
      "1,200W floodlights",
      "Single-lens 360° PTZ solar camera",
      "20ft/5M pole",
      "Full installation",
      "1-year guarantee"
    ]
  }
];

const Packages = () => {
  // WhatsApp information
  const whatsappNumber = "256778648157";
  const baseWhatsappLink = `https://wa.me/${whatsappNumber}?text=`;

  return (
    <section id="packages" className="py-16 md:py-24 relative">
      <div className="absolute left-0 top-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Packages</h2>
          <p className="text-lg text-muted-foreground">
            Choose from our carefully curated security packages designed to meet your specific needs and budget.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.title}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300 border",
                pkg.featured 
                  ? "border-primary shadow-lg shadow-primary/10" 
                  : "border-border/40 shadow-sm hover:shadow-md",
                "opacity-0 animate-fade-in"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
            >
              {pkg.featured && (
                <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={cn(
                "p-6",
                pkg.featured ? "bg-primary/5" : "bg-white"
              )}>
                <h3 className="text-xl font-semibold mb-1">{pkg.title}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={`${baseWhatsappLink}${encodeURIComponent(`Hello, I'm interested in your ${pkg.title}. Can you provide more information?`)}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block text-center py-3 px-6 rounded-lg font-medium transition-colors w-full",
                    pkg.featured 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "bg-white border border-primary/20 text-primary hover:bg-primary/5"
                  )}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
