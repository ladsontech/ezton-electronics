
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: string;
  title: string;
  images?: string[];
  image_url?: string | null;
}

const ProjectGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('id, image_url')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to ensure it matches the Project interface
      const transformedData = data?.map(gallery => {
        // Type assertion to handle potential number ID from database
        const projectData: Project = {
          ...project,
          id: String(gallery.id),
          // If project has images array, use it. Otherwise, if it has image_url, create an array with it
          images: gallery.images || (gallery.image_url ? [gallery.image_url] : [])
        };
        return projectData;
      }) || [];
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm">
                <Skeleton className="aspect-square w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Flatten all project images into a single array for gallery display
  const allImages = projects.flatMap(project => 
    project.images && project.images.length > 0 
      ? project.images 
      : (project.image_url ? [project.image_url] : [])
  );

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <div 
              key={`img-${index}`}
              className={cn(
                "rounded-xl overflow-hidden shadow-sm relative cursor-pointer group",
                "opacity-0 animate-fade-in hover:shadow-md transition-all duration-300"
              )}
              style={{ animationDelay: `${0.05 + index * 0.05}s`, animationFillMode: "forwards" }}
              onClick={() => openLightbox(image)}
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={image} 
                  alt="Project image"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Solid Color Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 md:w-12 md:h-12 opacity-60 transform rotate-12">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="none" />
                      <text x="50" y="55" fontSize="24" fontWeight="bold" fill="rgba(255,255,255,0.7)" textAnchor="middle">EZTON</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Lightbox for Image Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          
          <div className="max-w-5xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Project image" 
              className="object-contain max-h-[85vh] sm:max-h-[90vh] w-auto mx-auto"
            />
            
            {/* Solid Color Watermark in lightbox */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-36 h-36 sm:w-48 sm:h-48 opacity-50 transform rotate-12">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="none" />
                  <text x="50" y="55" fontSize="24" fontWeight="bold" fill="rgba(255,255,255,0.8)" textAnchor="middle">EZTON</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
