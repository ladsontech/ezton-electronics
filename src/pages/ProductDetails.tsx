
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  images: string[];
  category_id?: string;
}

const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (!error && data) setProduct(data);
    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin w-8 h-8 text-primary mb-2" />
        <div>Loading product details...</div>
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-lg text-muted-foreground">
        Product not found.
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      {/* Product details */}
      <div ref={contentRef} className="bg-white p-6 rounded-lg shadow border">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <img
              src={product.images?.[0] || "/placeholder.svg"}
              alt={product.title}
              className="rounded-lg w-full h-64 object-cover border mb-4"
              loading="lazy"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <div className="mb-2">
                <span className="text-primary text-xl font-semibold">
                  {product.price ? `UGX ${formatPrice(product.price)}` : "Contact for Price"}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div>
                <h2 className="font-semibold mb-1">Features</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features?.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {/* Any additional details or CTA */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
