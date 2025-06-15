
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: number;
  image_url: string;
}

const ProjectGallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
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

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  if (loading) {
    return <div className="py-12 text-center">Loading gallery images...</div>;
  }

  if (images.length === 0) {
    return (
      <div className="py-12 text-center">
        No gallery images found.
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div 
              key={img.id} 
              className="rounded-xl overflow-hidden shadow-sm cursor-pointer transform hover:scale-[1.02] transition-all"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={img.image_url}
                alt={`Gallery image ${index + 1}`}
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

            {selectedImageIndex !== null && images[selectedImageIndex] && (
              <div className="flex items-center justify-center h-full relative">
                <img 
                  src={images[selectedImageIndex].image_url} 
                  alt={`Gallery image ${selectedImageIndex + 1}`} 
                  className="max-h-[85vh] max-w-full object-contain"
                />

                <div className="absolute left-0 top-0 h-full w-full flex justify-between items-center px-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/50 text-white rounded-full h-10 w-10" 
                    onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/50 text-white rounded-full h-10 w-10" 
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectGallery;
