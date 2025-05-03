import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, ShoppingBag } from "lucide-react";
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
  category_id?: string;
}

const whatsappNumber = "+256778648157";
const whatsappMessage = "Hello, I'm interested in your products and would like more information.";
const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
const whatsappCatalogLink = `https://wa.me/c/256778648157`;

// Helper function to format price with commas
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from('products').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <section id="products" className="py-12 md:py-20 bg-white">
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
            {[...Array(6)].map((_, i) => <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>)}
          </div>
        </div>
      </section>;
  }
  return <section id="products" className="py-12 md:py-20 bg-white">
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
          {products.map((product, index) => <Link key={product.id} to={`/products/${product.id}`} className={cn("group bg-white border border-gray-100 rounded-xl shadow-sm", "opacity-0 animate-fade-in transition-all hover:shadow-md", "hover:border-primary/30 transform hover:-translate-y-1", "overflow-hidden")} style={{
          animationDelay: `${0.1 + index * 0.1}s`,
          animationFillMode: "forwards"
        }} onMouseEnter={() => setHoveredId(product.id)} onMouseLeave={() => setHoveredId(null)}>
              <div className="relative">
                <AspectRatio ratio={1 / 1} className="bg-muted">
                  <img src={product.images?.[0] || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </AspectRatio>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold mb-2 text-gray-800">
                  {product.title}
                </h3>
                {product.description && (
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {product.description}
                  </p>
                )}
                <div className="text-[11px] text-gray-600 space-y-1">
                  {product.features?.length > 0 && <div className="text-xs font-semibold text-primary pb-1 border-b border-gray-100">
                      {product.features[0]}
                    </div>}
                  {product.features?.slice(1, 7).map((feature, i) => <div key={i} className="flex items-start gap-1">
                      <span className="mt-1.5 w-1 h-1 bg-primary/80 rounded-full flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </div>)}
                  {(product.features?.length || 0) > 7 && <div className="text-xs text-muted-foreground pl-2 pt-1">
                      +{(product.features?.length || 0) - 7} more features
                    </div>}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-bold text-primary">
                    {product.price ? `UGX ${formatPrice(product.price)}` : 'Contact for Price'}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-sm">
                    View Details
                  </span>
                </div>
              </div>
            </Link>)}
        </div>

        <div className="mt-12 text-center">
          <a href={whatsappCatalogLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/30">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Explore Full Collection
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
          <p className="text-xs text-muted-foreground mt-4 animate-pulse">All products come with 1-year warranty and technical support</p>
        </div>
      </div>
    </section>;
};

export default Products;
