import { useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "Hikvision Color HD CCTV Camera",
    description: `24/7 Color Surveillance\n1080p Full HD resolution\nAdvanced color imaging technology\n30m infrared night vision\nWeatherproof IP67 rating\nMotion detection alerts\nCloud storage support\nRemote mobile access\n2-way audio communication\n120° viewing angle`,
    price: "UGX 450,000",
    images: ["/images/hikvision.jpg", "/images/sample1.jpg", "/images/sample2.jpg"]
  },
  {
    id: 2,
    name: "PTZ Dual Lens Solar Camera",
    description: `Dual Lens System\nFixed + 360° rotating cameras\n4G connectivity (SIM card)\nSolar powered operation\n50m night vision\nHuman detection\nWaterproof IP66\nReal-time alerts\nCloud/SD storage\nGlobal smartphone access`,
    price: "UGX 850,000",
    images: ["/images/solar_ptz.jpg", "/images/sample3.jpg", "/images/sample4.jpg"]
  },
  {
    id: 3,
    name: "Solar Star Street Light",
    description: `Smart Solar Lighting\n50W LED output\nAutomatic operation\n2-day battery backup\nIP65 weatherproof\nAdjustable height\nMotion sensor\nWide illumination\nEasy installation\nOvercharge protection`,
    price: "UGX 350,000",
    images: ["/images/solar_power.jpg", "/images/sample5.jpg", "/images/sample6.jpg"]
  },
  {
    id: 4,
    name: "Solar Automatic Flood Lights",
    description: `2300W Security Light\nPIR motion detection\nThree lighting modes\nIP67 waterproof\nLong battery life\nFast charging\nAdjustable mount\nOverheat protection\nWide coverage\nRemote control`,
    price: "UGX 280,000",
    images: ["/images/solar_flood_light.jpg", "/images/sample7.jpg", "/images/sample8.jpg"]
  },
  {
    id: 5,
    name: "EzFinder Tracking Chip",
    description: `Real-Time GPS Tracking\n4G LTE connectivity\nGeo-fencing alerts\nWaterproof design\n30-day battery\nVehicle tracking\nSpeed alerts\nMobile app\nLocation history\nWorldwide coverage`,
    price: "UGX 150,000",
    images: ["/images/gps_tracker.jpg", "/images/sample9.jpg", "/images/sample1.jpg"]
  },
  {
    id: 6,
    name: "4G Router Pro",
    description: `High-Speed Internet\nDual-band WiFi\nMultiple connections\nLAN/WAN ports\n4G LTE support\nLong battery life\nSignal boosting\nParental controls\nVPN support\nWeb management`,
    price: "UGX 200,000",
    images: ["/images/router.jpg", "/images/sample2.jpg", "/images/sample3.jpg"]
  }
];

const whatsappNumber = "+256778648157";
const whatsappMessage = "Hello, I'm interested in your products and would like more information.";
const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
const whatsappCatalogLink = `https://wa.me/c/256778648157`;

const Products = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Our Products
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Premium security and solar solutions for modern needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={cn(
                "group bg-white border border-gray-100 rounded-xl shadow-sm",
                "opacity-0 animate-fade-in transition-all hover:shadow-md",
                "hover:border-primary/30 transform hover:-translate-y-1",
                "overflow-hidden"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden">
                <Carousel className="w-full hover:shadow-lg">
                  <CarouselContent>
                    {product.images.map((image, i) => (
                      <CarouselItem key={i}>
                        <AspectRatio ratio={4/3} className="bg-muted w-full">
                          <img 
                            src={image} 
                            alt={`${product.name} - view ${i+1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                <h3 className="text-base font-bold mb-2 line-clamp-2 leading-tight text-gray-800">
                  {product.name}
                </h3>
                <div className="text-xs text-gray-600 mb-3 space-y-2">
                  {product.description.split('\n').map((line, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "relative pl-4 transition-colors",
                        i === 0 ? "font-semibold text-primary text-sm pb-2 border-b border-gray-100" : ""
                      )}
                    >
                      {i > 0 && (
                        <span className="absolute left-0 top-1.5 w-2 h-2 bg-primary/80 rounded-full"></span>
                      )}
                      <span className={i === 0 ? "inline-block" : "leading-relaxed"}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-bold text-primary">{product.price}</span>
                  <a 
                    href={`${whatsappLink}&product=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-4 py-2 text-xs font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-sm"
                  >
                    Get Quote
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
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/30"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Explore Full Collection
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
          <p className="text-xs text-muted-foreground mt-4 animate-pulse">
            All products come with 2-year warranty and technical support
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;