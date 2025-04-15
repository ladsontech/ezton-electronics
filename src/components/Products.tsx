
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "Hikvision Color HD CCTV Camera",
    description: "Professional-grade HD CCTV camera with night vision and color imaging technology.",
    price: "UGX 450,000",
    images: [
      "/images/hikvision.jpg",
      "/images/sample1.jpg",
      "/images/sample2.jpg"
    ]
  },
  {
    id: 2,
    name: "PTZ Dual Lens Power Heavy Siren Camera",
    description: "Advanced dual lens PTZ camera with built-in siren and motion detection.",
    price: "UGX 850,000",
    images: [
      "/images/solar_ptz.jpg",
      "/images/sample3.jpg",
      "/images/sample4.jpg"
    ]
  },
  {
    id: 3,
    name: "Solar Star Street Light",
    description: "High-efficiency solar-powered street light with automatic dusk-to-dawn operation.",
    price: "UGX 350,000",
    images: [
      "/images/solar_power.jpg",
      "/images/sample5.jpg",
      "/images/sample6.jpg"
    ]
  },
  {
    id: 4,
    name: "Solar Automatic Flood Lights",
    description: "2,300W solar flood light with motion sensor and wide coverage area.",
    price: "UGX 280,000",
    images: [
      "/images/solar_flood_light.jpg",
      "/images/sample7.jpg",
      "/images/sample8.jpg"
    ]
  },
  {
    id: 5,
    name: "EzFinder Tracking Chip Technology",
    description: "Advanced GPS tracking solution for vehicles and assets.",
    price: "UGX 150,000",
    images: [
      "/images/gps_tracker.jpg",
      "/images/sample9.jpg",
      "/images/sample1.jpg"
    ]
  },
  {
    id: 6,
    name: "4G Router Pro",
    description: "High-speed 4G router with dual-band WiFi and extensive coverage.",
    price: "UGX 200,000",
    images: [
      "/images/router.jpg",
      "/images/sample2.jpg",
      "/images/sample3.jpg"
    ]
  }
];

// Updated WhatsApp number
const whatsappNumber = "+256778648157";
const whatsappMessage = "Hello, I'm interested in your products and would like more information.";
const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
const whatsappCatalogLink = `https://wa.me/c/256778648157`;

const Products = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-lg text-muted-foreground">
            Explore our wide range of security cameras, solar systems, and smart technology solutions.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={cn(
                "product-card group hover-lift overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm",
                "opacity-0 animate-fade-in transition-all hover:shadow-md"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image, i) => (
                      <CarouselItem key={i}>
                        <AspectRatio ratio={4/3} className="bg-muted w-full">
                          <img 
                            src={image} 
                            alt={`${product.name} - view ${i+1}`}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 hover:bg-white/90" />
                  <CarouselNext className="right-2 hover:bg-white/90" />
                </Carousel>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-muted-foreground mb-3 text-sm line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{product.price}</span>
                  <a 
                    href={`${whatsappLink}&product=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline py-1.5 px-3 text-sm"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href={whatsappCatalogLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 py-3 px-6 text-base"
          >
            <ShoppingBag className="h-5 w-5" />
            View All Products
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
          <p className="text-sm text-muted-foreground mt-3">
            Discover our complete product range with detailed information and pricing
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;
