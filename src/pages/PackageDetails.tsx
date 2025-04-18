import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from "sonner";

const packages = [
  {
    id: "5-star-gold",
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
    ],
    images: ["/images/solar_ptz.jpg", "/images/solar_flood_light.jpg", "/images/sample1.jpg"],
    description: "Our premium package offering comprehensive security coverage with the latest technology."
  },
  {
    id: "gold",
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
    ],
    images: ["/images/solar_ptz.jpg", "/images/solar_power.jpg", "/images/sample2.jpg"],
    description: "A comprehensive security solution with advanced features for enhanced protection."
  },
  {
    id: "silver",
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
    ],
    images: ["/images/solar_power.jpg", "/images/solar_flood_light.jpg", "/images/sample3.jpg"],
    description: "A balanced security package offering essential features for reliable surveillance."
  },
  {
    id: "bronze",
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
    ],
    images: ["/images/solar_flood_light.jpg", "/images/solar_ptz.jpg", "/images/sample4.jpg"],
    description: "An affordable security solution providing basic surveillance for peace of mind."
  },
  {
    id: "diamond",
    title: "Diamond Package",
    price: "UGX 900,000",
    featured: false,
    features: [
      "1,200W floodlights",
      "Single-lens 360° PTZ solar camera",
      "20ft/5M pole",
      "Full installation",
      "1-year guarantee"
    ],
    images: ["/images/solar_power.jpg", "/images/solar_flood_light.jpg", "/images/sample5.jpg"],
    description: "An entry-level security package offering essential surveillance features at a budget-friendly price."
  }
];

const PackageDetails = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const isMobile = useIsMobile();
  const pkg = packages.find(p => p.id === packageId);

  useEffect(() => {
    if (pkg) {
      document.title = `${pkg.title} - Ezton E & E Ltd.`;
    }
  }, [pkg]);

  const handleShare = async () => {
    if (!pkg) return;
    
    const shareData = {
      title: pkg.title,
      text: pkg.description,
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

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Package not found</h2>
          <Link to="/solutions" className="text-primary hover:underline">
            Back to Solutions
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
              Back to Packages
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
              {pkg.images.map((image: string, i: number) => (
                <div key={i}>
                  <AspectRatio ratio={4/3} className="bg-muted rounded-xl overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${pkg.title} - view ${i+1}`}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>

            <div>
              {pkg.featured && (
                <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Most Popular
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">{pkg.title}</h1>
              <div className="mb-6">
                <span className="text-xl font-bold text-primary">{pkg.price}</span>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h2 className="text-lg font-semibold mb-4">Package Features</h2>
                <div className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a 
                href={`https://wa.me/256778648157?text=${encodeURIComponent(`Hello, I'm interested in the ${pkg.title}. Please provide more information.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-base font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md"
              >
                Get Started
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

export default PackageDetails;
