import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Package {
  id: string;
  title: string;
  description?: string;
  price?: number;
  features: string[];
  images: string[];
}

const PackageDetails = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (packageId) {
      fetchPackage(packageId);
    }
  }, [packageId]);

  const fetchPackage = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setPkg(data);
      document.title = `${data.title} - Ezton E & E Ltd.`;
    } catch (error) {
      console.error('Error fetching package:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!pkg) return;
    
    const shareData = {
      title: pkg.title,
      text: pkg.description || '',
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

  if (!loading && !pkg) {
    return <Navigate to="/solutions" replace />;
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

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:hidden overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex gap-4 pl-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[85vw]">
                      <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full aspect-[4/3] rounded-xl" />
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          ) : pkg && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:hidden overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex gap-4 pl-4">
                  {pkg.images?.map((image, i) => (
                    <div key={i} className="min-w-[85vw]">
                      <AspectRatio ratio={4/3} className="bg-muted rounded-xl overflow-hidden shadow-sm">
                        <img
                          src={image}
                          alt={`${pkg.title} - ${i+1}`}
                          className="w-full h-full object-cover"
                          loading={i === 0 ? "eager" : "lazy"
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block space-y-4">
                {pkg.images?.map((image, i) => (
                  <AspectRatio 
                    key={i} 
                    ratio={4/3} 
                    className="bg-muted rounded-xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={image}
                      alt={`${pkg.title} - ${i+1}`}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"
                    />
                  </AspectRatio>
                ))}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">{pkg.title}</h1>
                <div className="mb-6">
                  <span className="text-xl font-bold text-primary">
                    {pkg.price ? `UGX ${pkg.price}` : 'Contact for price'}
                  </span>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h2 className="text-lg font-semibold mb-4">Package Features</h2>
                  <div className="space-y-3">
                    {pkg.features?.map((feature, i) => (
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
          )}
        </div>
      </div>
      <Footer />
      {!isMobile && <FloatingCTA />}
      <BottomNavbar />
      <div className="md:hidden h-16"></div>
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PackageDetails;