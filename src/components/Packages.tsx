
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
  featured?: boolean;
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
  const whatsappNumber = "256778648157";
  const baseWhatsappLink = `https://wa.me/${whatsappNumber}?text=`;

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
      
      // Map the data and add featured property to first package
      const processedPackages = data?.map((pkg, index) => ({
        ...pkg,
        featured: index === 0
      })) || [];
      
      setPackages(processedPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="packages" className="py-16 md:py-24 relative">
        <div className="absolute left-0 top-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Packages</h2>
            <p className="text-lg text-muted-foreground">
              Choose from our carefully curated security packages designed to meet your specific needs and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border shadow-sm">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-6 w-1/3" />
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(2)].map((_, j) => (
                      <Skeleton key={j} className="h-16 w-full rounded-lg" />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-16 md:py-24 relative">
      <div className="absolute left-0 top-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Packages</h2>
          <p className="text-lg text-muted-foreground">
            Choose from our carefully curated security packages designed to meet your specific needs and budget.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300 border",
                pkg.featured 
                  ? "border-primary shadow-lg shadow-primary/10" 
                  : "border-border/40 shadow-sm hover:shadow-md",
                "opacity-0 animate-fade-in"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
            >
              {pkg.featured && (
                <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={cn(
                pkg.featured ? "bg-primary/5" : "bg-white"
              )}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={pkg.images?.[0] || "/placeholder.svg"} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{pkg.title}</h3>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-3xl font-bold">
                      {pkg.price ? `UGX ${formatPrice(pkg.price)}` : 'Contact for Price'}
                    </span>
                  </div>
                  
                  {pkg.description && (
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  )}
                  
                  <ul className="space-y-2 mb-8">
                    {pkg.features?.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-primary mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {(pkg.features?.length || 0) > 3 && (
                      <li className="text-sm text-muted-foreground pl-6">
                        +{pkg.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {pkg.images?.slice(1, 3).map((image, i) => (
                        <div key={i} className="overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt={`${pkg.title} - view ${i + 2}`}
                            className="w-full h-full object-cover aspect-square"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <Link 
                      to={`/packages/${pkg.id}`}
                      className={cn(
                        "flex items-center justify-center text-center py-3 px-6 rounded-lg font-medium transition-colors w-full gap-2",
                        pkg.featured 
                          ? "bg-primary text-white hover:bg-primary/90" 
                          : "bg-white border border-primary/20 text-primary hover:bg-primary/5"
                      )}
                    >
                      <Eye className="w-4 h-4" /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
