
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const products = [
  {
    id: 1,
    name: "Hikvision Color HD CCTV Camera",
    description: "Professional-grade HD CCTV camera with night vision and color imaging technology.",
    price: "UGX 450,000",
    image: "/images/hikvision.jpg"
  },
  {
    id: 2,
    name: "PTZ Dual Lens Power Heavy Siren Camera",
    description: "Advanced dual lens PTZ camera with built-in siren and motion detection.",
    price: "UGX 850,000",
    image: "/images/solar_ptz.jpg"
  },
  {
    id: 3,
    name: "Solar Star Street Light",
    description: "High-efficiency solar-powered street light with automatic dusk-to-dawn operation.",
    price: "UGX 350,000",
    image: "/images/solar_power.jpg"
  },
  {
    id: 4,
    name: "Solar Automatic Flood Lights",
    description: "2,300W solar flood light with motion sensor and wide coverage area.",
    price: "UGX 280,000",
    image: "/images/solar_flood_light.jpg"
  },
  {
    id: 5,
    name: "EzFinder Tracking Chip Technology",
    description: "Advanced GPS tracking solution for vehicles and assets.",
    price: "UGX 150,000",
    image: "/images/gps_tracker.jpg"
  },
  {
    id: 6,
    name: "4G Router Pro",
    description: "High-speed 4G router with dual-band WiFi and extensive coverage.",
    price: "UGX 200,000",
    image: "/images/router.jpg"
  }
];

// Updated WhatsApp number
const whatsappNumber = "+256778648157";
const whatsappMessage = "Hello, I'm interested in your products and would like more information.";
const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

const Products = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Technology Solutions</h2>
          <p className="text-lg text-muted-foreground">
            Explore our wide range of security cameras, solar systems, and smart technology solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={cn(
                "product-card group hover-lift overflow-hidden bg-white",
                "opacity-0 animate-fade-in"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden">
                <AspectRatio ratio={1} className="bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-500",
                      hoveredId === product.id ? "scale-110" : "scale-100"
                    )}
                  />
                </AspectRatio>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{product.price}</span>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline py-2 px-4 text-sm"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
