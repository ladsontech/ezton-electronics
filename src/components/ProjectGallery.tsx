import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  image_url: string;
}

const ProjectGallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("id, image_url")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading gallery:", error);
    } else if (data) {
      // Cast id to string so TS stays happy
      const items = data.map((row) => ({
        id: String(row.id),
        image_url: row.image_url!,
      }));
      setImages(items);
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading…</div>;
  }

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="rounded-xl overflow-hidden shadow-sm">
              <img
                src={img.image_url}
                alt={`Gallery ${img.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
