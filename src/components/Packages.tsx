
import { useEffect, useState } from "react";
import { Check, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Package {
  id: string;
  title: string;
  price: number;
  features: string[];
  images: string[];
  description?: string;
}

// Helper function to format price with commas
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Compact loading skeletons
    return (
      <section id="packages" className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Security Packages</h2>
            <p className="text-base text-muted-foreground">
              Choose from our security packages to fit your needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border bg-white">
                <Skeleton className="h-32 w-full rounded-t-xl" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                  <div className="space-y-1">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} className="h-3 w-5/6" />
                    ))}
                  </div>
                  <Skeleton className="h-8 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-10 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Security Packages</h2>
          <p className="text-base text-muted-foreground">
            Choose from our security packages to fit your needs and budget.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-xl border bg-white transition-all duration-200 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl bg-muted">
                <img
                  src={pkg.images?.[0] || "/placeholder.svg"}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-semibold mb-1">{pkg.title}</h3>
                <div className="text-lg font-bold mb-2 text-primary">
                  {pkg.price ? `UGX ${formatPrice(pkg.price)}` : 'Contact for Price'}
                </div>
                <ul className="space-y-1 mb-4">
                  {pkg.features?.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start text-xs">
                      <Check className="h-3 w-3 text-primary mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/packages/${pkg.id}`}
                  className="flex items-center justify-center gap-2 text-xs font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition py-2 mt-auto"
                >
                  <Eye className="w-4 h-4" /> View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
