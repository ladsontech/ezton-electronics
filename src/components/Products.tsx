import { useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, ShoppingBag } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "Hikvision Color HD CCTV Camera",
    description: `24/7 Color Surveillance\n1080p Full HD resolution\nAdvanced color imaging technology\n30m infrared night vision\nWeatherproof IP67 rating\nMotion detection & smartphone alerts\nSupports HDD/SD card/cloud storage\nEasy installation & remote mobile access\n2-way audio communication\nWide 120° viewing angle`,
    price: "UGX 450,000",
    images: ["/images/hikvision.jpg", "/images/sample1.jpg", "/images/sample2.jpg"]
  },
  {
    id: 2,
    name: "PTZ Dual Lens Solar Camera",
    description: `Dual Lens Technology\nFixed + 360° rotating cameras\n4G connectivity (SIM card slot)\nSolar powered with backup battery\n50m night vision & human detection\n2-way audio & built-in alarm\nWaterproof IP66 rating\nMotion tracking & real-time alerts\nSD/cloud storage options\nRemote global access via smartphone`,
    price: "UGX 850,000",
    images: ["/images/solar_ptz.jpg", "/images/sample3.jpg", "/images/sample4.jpg"]
  },
  {
    id: 3,
    name: "Solar Star Street Light",
    description: `Smart Solar Lighting\n50W LED with 6000lm output\nAuto dusk-to-dawn operation\n2-day battery backup\nIP65 weather resistance\n10m pole height option\nMotion sensor mode\n120° wide illumination\nEasy installation & maintenance\nOvercharge/overload protection`,
    price: "UGX 350,000",
    images: ["/images/solar_power.jpg", "/images/sample5.jpg", "/images/sample6.jpg"]
  },
  {
    id: 4,
    name: "Solar Automatic Flood Lights",
    description: `2300W Solar Security Light\nPIR motion detection (10m range)\n3 lighting modes: Smart/Full/Off\n120° wide-angle detection\nIP67 waterproof rating\n20,000mAh battery capacity\n2-3 nights backup power\n3hr fast solar charging\nAdjustable mounting bracket\nOverheat protection`,
    price: "UGX 280,000",
    images: ["/images/solar_flood_light.jpg", "/images/sample7.jpg", "/images/sample8.jpg"]
  },
  {
    id: 5,
    name: "EzFinder Tracking Chip",
    description: `Real-Time GPS Tracking\n4G LTE connectivity\nWorldwide coverage\nGeo-fencing alerts\n15-day location history\nWaterproof casing\n30-day standby battery\nVehicle/asset tracking\nSpeed alert system\nMobile app integration`,
    price: "UGX 150,000",
    images: ["/images/gps_tracker.jpg", "/images/sample9.jpg", "/images/sample1.jpg"]
  },
  {
    id: 6,
    name: "4G Router Pro",
    description: `High-Speed Connectivity\nDual-band WiFi 2.4/5GHz\n32 simultaneous connections\nLAN/WAN ports\n150Mbps download speed\nSIM card slot (4G LTE)\n8h backup battery\nSmart signal boosting\nParental controls\nVPN support`,
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Products</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Explore our security cameras, solar systems, and smart technology solutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={cn(
                "group bg-white border border-gray-100 rounded-lg shadow-xs",
                "opacity-0 animate-fade-in transition-all hover:shadow-sm",
                "hover:border-primary/20"
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
              <div className="p-3">
                <h3 className="text-base font-semibold mb-1.5 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="text-xs text-gray-600 mb-2.5 space-y-1.5">
                  {product.description.split('\n').map((line, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "relative pl-3",
                        i === 0 ? "font-medium text-primary" : "text-gray-600"
                      )}
                    >
                      {i > 0 && (
                        <span className="absolute left-0 top-1.5 w-1 h-1 bg-gray-400 rounded-full"></span>
                      )}
                      <span className={i === 0 ? "inline-block mt-0.5" : ""}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">{product.price}</span>
                  <a 
                    href={`${whatsappLink}&product=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a 
            href={whatsappCatalogLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            View Full Catalog
            <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </a>
          <p className="text-xs text-muted-foreground mt-2.5">
            Explore detailed specifications and special packages via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;