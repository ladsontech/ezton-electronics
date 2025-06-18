
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  images: string[];
  featured?: boolean;
}

// Helper function to format price with commas
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  
  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(6)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Featured Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Security Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Discover our most popular and trusted security products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Security Solutions</h2>
          <p className="text-lg text-muted-foreground">
            Discover our most popular and trusted security products
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`} 
              className={cn(
                "group bg-white border border-gray-100 rounded-xl shadow-sm", 
                "opacity-0 animate-fade-in transition-all hover:shadow-lg", 
                "hover:border-primary/30 transform hover:-translate-y-2", 
                "overflow-hidden"
              )} 
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
                animationFillMode: "forwards"
              }}
            >
              <div className="relative">
                <AspectRatio ratio={1 / 1} className="bg-muted">
                  <img 
                    src={product.images?.[0] || "/placeholder.svg"} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    loading="lazy" 
                  />
                </AspectRatio>
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                )}
                <div className="text-xs text-gray-600 space-y-1 mb-4">
                  {product.features?.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-primary/80 rounded-full flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                  {(product.features?.length || 0) > 3 && (
                    <div className="text-xs text-muted-foreground pl-3 pt-1">
                      +{(product.features?.length || 0) - 3} more features
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {product.price ? `UGX ${formatPrice(product.price)}` : 'Contact for Price'}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-4 py-2 text-sm font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-sm group-hover:shadow-md">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/solutions" 
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-8 py-3 text-base font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md hover:shadow-lg"
          >
            View All Products <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
