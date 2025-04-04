
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const projects = [
  {
    title: "Professional CCTV Installation",
    category: "CCTV Installation",
    image: "/images/sample1.jpg"
  },
  {
    title: "Solar Energy Solutions",
    category: "Solar Panel Setup",
    image: "/images/sample2.jpg"
  },
  {
    title: "Advanced Security Systems",
    category: "Security System",
    image: "/images/sample3.jpg"
  },
  {
    title: "Network Infrastructure",
    category: "Network Installation",
    image: "/images/sample4.jpg"
  },
  {
    title: "Smart Home Integration",
    category: "Smart Home",
    image: "/images/sample5.jpg"
  },
  {
    title: "Access Control Systems",
    category: "Access Control",
    image: "/images/sample6.jpg"
  },
  // Adding more sample projects for the dedicated page
  {
    title: "Commercial Security",
    category: "Business Security",
    image: "/images/sample7.jpg"
  },
  {
    title: "Residential Surveillance",
    category: "Home Security",
    image: "/images/sample8.jpg"
  },
  {
    title: "Industrial Protection",
    category: "Industrial Security",
    image: "/images/sample9.jpg"
  }
];

const ProjectGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  
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

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={cn(
                "rounded-xl overflow-hidden shadow-sm relative cursor-pointer group",
                "opacity-0 animate-fade-in hover:shadow-md transition-all duration-300"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              onClick={() => openLightbox(project.image, project.title)}
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Reduced Size Blurred Logo Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 md:w-12 md:h-12 opacity-70 transform rotate-12">
                    <img 
                      src="/images/ezton_logo.png" 
                      alt="Ezton Watermark" 
                      className="w-full h-full object-contain filter blur-[1px]"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/50 text-white">
                  <h3 className="text-sm font-medium">{project.title}</h3>
                  <p className="text-xs opacity-80">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
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
            
            {/* Smaller Watermark in lightbox */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-36 h-36 sm:w-48 sm:h-48 opacity-60 transform rotate-12">
                <img 
                  src="/images/ezton_logo.png" 
                  alt="Ezton Watermark" 
                  className="w-full h-full object-contain filter blur-[1px]"
                />
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
