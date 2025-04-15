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
    description: `*24/7 Color Surveillance*\n- 1080p Full HD resolution\n- Advanced color imaging technology\n- 30m infrared night vision\n- Weatherproof IP67 rating\n- Motion detection & smartphone alerts\n- Supports HDD/SD card/cloud storage\n- Easy installation & remote mobile access\n- 2-way audio communication\n- Wide 120° viewing angle`,
    price: "UGX 450,000",
    images: [
      "/images/hikvision.jpg",
      "/images/sample1.jpg",
      "/images/sample2.jpg"
    ]
  },
  {
    id: 2,
    name: "PTZ Dual Lens Solar Camera",
    description: `*Dual Lens Technology*\n- Fixed + 360° rotating cameras\n- 4G connectivity (SIM card slot)\n- Solar powered with backup battery\n- 50m night vision & human detection\n- 2-way audio & built-in alarm\n- Waterproof IP66 rating\n- Motion tracking & real-time alerts\n- SD/cloud storage options\n- Remote global access via smartphone\n- 5x digital zoom capability`,
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
    description: `*Smart Solar Lighting*\n- 50W LED with 6000lm output\n- Auto dusk-to-dawn operation\n- 2-day battery backup\n- IP65 weather resistance\n- 10m pole height option\n- Motion sensor mode\n- 120° wide illumination\n- Easy installation & maintenance\n- 5-7hrs full brightness runtime\n- Overcharge/overload protection`,
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
    description: `*2300W Solar Security Light*\n- PIR motion detection (10m range)\n- 3 lighting modes: Smart/Full/Off\n- 120° wide-angle detection\n- IP67 waterproof rating\n- 20,000mAh battery capacity\n- 2-3 nights backup power\n- 3hr fast solar charging\n- Adjustable mounting bracket\n- Remote control included\n- Overheat/overcharge protection`,
    price: "UGX 280,000",
    images: [
      "/images/solar_flood_light.jpg",
      "/images/sample7.jpg",
      "/images/sample8.jpg"
    ]
  },
  {
    id: 5,
    name: "EzFinder Tracking Chip",
    description: `*Real-Time GPS Tracking*\n- 4G LTE connectivity\n- Worldwide coverage\n- Geo-fencing alerts\n- 15-day location history\n- Waterproof casing\n- 30-day standby battery\n- Vehicle/asset tracking\n- Speed alert system\n- Shock/vibration detection\n- Mobile app integration`,
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
    description: `*High-Speed Connectivity*\n- Dual-band WiFi 2.4/5GHz\n- 32 simultaneous connections\n- LAN/WAN ports\n- 150Mbps download speed\n- SIM card slot (4G LTE)\n- 8h backup battery\n- Smart signal boosting\n- Parental controls\n- VPN support\n- Web management portal`,
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
                            loading="lazy"
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
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                <div className="text-muted-foreground mb-3 text-sm whitespace-pre-line">
                  {product.description.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('*') ? "font-semibold text-primary mt-2" : "ml-2"}>
                      {line.replace('*', '')}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold text-primary">{product.price}</span>
                  <a 
                    href={`${whatsappLink}&product=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                  >
                    Inquire Now
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
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            View Full Catalog
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
          <p className="text-sm text-muted-foreground mt-3">
            Explore detailed specifications and special packages via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;