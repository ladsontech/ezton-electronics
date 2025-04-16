import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Share2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from "sonner";

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

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(productId));
    
    if (foundProduct) {
      setProduct(foundProduct);
      document.title = `${foundProduct.name} - Ezton E & E Ltd.`;
      updateMetaTags(foundProduct);
    }
  }, [productId]);

  const updateMetaTags = (product: any) => {
    const metaTags = {
      'og:title': `${product.name} - Ezton E & E Ltd.`,
      'og:description': product.description.split('\n')[0],
      'og:image': product.images[0],
      'og:url': window.location.href,
      'description': product.description.split('\n')[0],
    };

    Object.entries(metaTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description.split('\n')[0],
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/solutions" className="text-primary hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/solutions" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Products
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {product.images.map((image: string, i: number) => (
                <div key={i}>
                  <AspectRatio ratio={4/3} className="bg-muted rounded-xl overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${i+1}`}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">{product.name}</h1>
              <div className="mb-4">
                <span className="text-xl font-bold text-primary">{product.price}</span>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h2 className="text-lg font-semibold mb-4 text-primary">Product Specifications</h2>
                <div className="text-sm space-y-3">
                  {product.description.split('\n').map((line: string, i: number) => (
                    <div 
                      key={i} 
                      className={`relative pl-5 ${i === 0 ? "font-semibold text-gray-800" : ""}`}
                    >
                      {i > 0 && (
                        <span className="absolute left-0 top-1.5 w-2 h-2 bg-primary/80 rounded-full"></span>
                      )}
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a 
                href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(`Hello, I'm interested in the ${product.name}. Please provide more information.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-base font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default ProductDetails;
