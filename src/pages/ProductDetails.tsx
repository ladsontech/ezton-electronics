
import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import BottomNavbar from "@/components/BottomNavbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Share2, Check, Loader2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  title: string;
  description?: string;
  features: string[];
  price?: number;
  images: string[];
  category_id?: string;
}

const formatPrice = (price: number) =>
  price
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      setProduct(data);
      document.title = `${data.title} - Ezton E & E Ltd.`;
    }
    setLoading(false);
  };

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: product.title,
      text: product.description || "",
      url: window.location.href,
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

  if (!loading && !product) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-lg text-muted-foreground">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header navigation row */}
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
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
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
            </div>
          ) : product && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                {product.images?.length ? (
                  product.images.map((img, i) => (
                    <div key={i}>
                      <AspectRatio ratio={4 / 3} className="bg-muted rounded-xl overflow-hidden">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`${product.title} - view ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      </AspectRatio>
                    </div>
                  ))
                ) : (
                  <AspectRatio ratio={4 / 3} className="bg-muted rounded-xl overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="No Product"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">{product.title}</h1>
                <div className="mb-4">
                  <span className="text-xl font-bold text-primary">
                    {product.price ? `UGX ${formatPrice(product.price)}` : "Contact for price"}
                  </span>
                </div>
                {product.description && (
                  <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-lg font-semibold mb-2 text-primary">Description</h2>
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                )}
                {product.features?.length > 0 && (
                  <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-lg font-semibold mb-4">Product Features</h2>
                    <div className="space-y-3">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <a
                  href={`https://wa.me/256778648157?text=${encodeURIComponent(
                    `Hello, I'm interested in the ${product.title}. Please provide more information.`
                  )}`}
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
    </div>
  );
};

export default ProductDetails;
