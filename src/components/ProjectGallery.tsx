
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GalleryItem {
  id: number;
  image_url: string;
}

const ProjectGallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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
      setImages(data);
    }

    setLoading(false);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  if (loading) {
    return <div className="py-12 text-center">Loading gallery images...</div>;
  }

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="rounded-xl overflow-hidden shadow-sm cursor-pointer transform hover:scale-[1.02] transition-all"
              onClick={() => handleImageClick(img.image_url)}
            >
              <img
                src={img.image_url}
                alt={`Gallery ${img.id}`}
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl w-[95vw] p-1 bg-black/95 border-gray-800">
            <DialogClose className="absolute right-2 top-2 z-10">
              <Button variant="ghost" size="icon" className="bg-black/50 text-white rounded-full h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
            {selectedImage && (
              <div className="flex items-center justify-center h-full">
                <img 
                  src={selectedImage} 
                  alt="Gallery image" 
                  className="max-h-[85vh] max-w-full object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectGallery;
