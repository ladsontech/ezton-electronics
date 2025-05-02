
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: number;
  title: string;
  description?: string;
  location?: string;
  completion_date?: string;
  images: string[];
  image_url?: string | null;
  budget?: number;
  start_date?: string;
  end_date?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

const ProjectGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to ensure it matches the Project interface
      const transformedData = data?.map(project => {
        return {
          ...project,
          // If project has image_url but no images array, create an images array with the image_url
          images: project.images || (project.image_url ? [project.image_url] : [])
        };
      }) || [];
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  const openLightbox = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedTitle(null);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm">
                <Skeleton className="aspect-[3/4] w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            // Get the first image from images array or use image_url as fallback
            const displayImage = project.images?.[0] || project.image_url || "/placeholder.svg";
            
            return (
              <div 
                key={project.id}
                className={cn(
                  "rounded-xl overflow-hidden shadow-sm relative cursor-pointer group",
                  "opacity-0 animate-fade-in hover:shadow-md transition-all duration-300"
                )}
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
                onClick={() => displayImage && openLightbox(displayImage, project.title)}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={displayImage} 
                    alt={project.title}
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
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/50 text-white">
                    <h3 className="text-sm font-medium">{project.title}</h3>
                    {project.location && (
                      <p className="text-xs opacity-80">{project.location}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Improved Mobile Responsive Lightbox */}
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
          
          <div className="max-w-5xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt={selectedTitle || "Project image"} 
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
            
            {selectedTitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 sm:p-3 text-center">
                <h3 className="font-medium text-sm sm:text-base">{selectedTitle}</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
