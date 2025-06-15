import { useEffect, useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BottomNavbar from '@/components/BottomNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Share2, FileText } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { usePDF } from 'react-to-pdf';

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

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  const { toPDF, targetRef } = usePDF({
    filename: product ? `${product.title.replace(/\s+/g, '_')}_details.pdf` : 'product_details.pdf',
    page: {
      margin: 15
    }
  });

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setProduct(data);
      document.title = `${data.title} - Ezton E & E Ltd.`;
      updateMetaTags(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMetaTags = (product: Product) => {
    const metaTags = {
      'og:title': `${product.title} - Ezton E & E Ltd.`,
      'og:description': product.description || product.features?.[0] || '',
      'og:image': product.images?.[0] || '',
      'og:url': window.location.href,
      'description': product.description || product.features?.[0] || '',
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
    if (!product) return;
    
    const shareData = {
      title: product.title,
      text: product.description || product.features?.[0] || '',
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

  const handleGeneratePDF = () => {
    if (!product) return;

    try {
      toPDF();
      toast.success('PDF generated successfully!');
    } catch (err) {
      console.error('Error generating PDF:', err);
      toast.error('Failed to generate PDF');
    }
  };

  if (!isLoading && !product) {
    return <Navigate to="/solutions" replace />;
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
            <div className="flex gap-2">
              <Button
                onClick={handleGeneratePDF}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <FileText className="w-4 h-4" />
                Save as PDF
              </Button>
              <button
                onClick={handleShare}
                className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
            </div>
          </div>

          <div ref={targetRef} className="pdf-content">
            {isLoading ? (
              <>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <Skeleton key={i} className="w-full aspect-[4/3]" />
                  ))}
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              product && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {product.images?.map((image: string, i: number) => (
                      <div key={i}>
                        <AspectRatio ratio={4/3} className="bg-muted rounded-xl overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${product.title} - view ${i+1}`}
                            className="w-full h-full object-cover"
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                        </AspectRatio>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">{product.title}</h1>
                    <div className="mb-4">
                      <span className="text-xl font-bold text-primary">
                        {product.price ? `UGX ${formatPrice(product.price)}` : 'Contact for Price'}
                      </span>
                    </div>
                    
                    {product.description && (
                      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                        <h2 className="text-lg font-semibold mb-2 text-primary">Description</h2>
                        <p className="text-gray-700">{product.description}</p>
                      </div>
                    )}
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                      <h2 className="text-lg font-semibold mb-4 text-primary">Product Specifications</h2>
                      <div className="text-sm space-y-3">
                        {product.features?.map((feature: string, i: number) => (
                          <div 
                            key={i} 
                            className={`relative pl-5 ${i === 0 ? "font-semibold text-gray-800" : ""}`}
                          >
                            {i > 0 && (
                              <span className="absolute left-0 top-1.5 w-2 h-2 bg-primary/80 rounded-full"></span>
                            )}
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a 
                      href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(`Hello, I'm interested in the ${product.title}. Please provide more information.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-base font-medium text-white hover:from-primary/90 hover:to-blue-600/90 transition-all shadow-md"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              )
            )}
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
