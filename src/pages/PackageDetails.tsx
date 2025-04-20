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
  // ... existing code remains the same until the return statement ...

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... existing header code remains the same ... */}

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {/* Mobile skeleton slider */}
                <div className="md:hidden">
                  <div className="flex overflow-x-auto space-x-4 pb-4 pl-4 pr-4 hide-scrollbar">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex-shrink-0 w-[80vw]">
                        <Skeleton className="w-full aspect-[4/3]" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Desktop skeleton stack */}
                <div className="hidden md:block space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="w-full aspect-[4/3]" />
                  ))}
                </div>
              </div>
              {/* ... rest of skeleton code remains the same ... */}
            </div>
          ) : pkg && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {/* Mobile horizontal slider */}
                <div className="md:hidden">
                  <div className="flex overflow-x-auto space-x-4 pb-4 pl-4 pr-4 hide-scrollbar">
                    {pkg.images?.map((image: string, i: number) => (
                      <div key={i} className="flex-shrink-0 w-[80vw]">
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
                </div>

                {/* Desktop vertical stack */}
                <div className="hidden md:block space-y-4">
                  {pkg.images?.map((image: string, i: number) => (
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
              </div>

              {/* ... rest of the content remains the same ... */}
            </div>
          )}
        </div>
      </div>
      {/* ... existing footer code remains the same ... */}
    </div>
  );
};

export default PackageDetails;