
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Professional CCTV Installation",
    category: "CCTV Installation",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Solar Energy Solutions",
    category: "Solar Panel Setup",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Advanced Security Systems",
    category: "Security System",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Network Infrastructure",
    category: "Network Installation",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Smart Home Integration",
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Access Control Systems",
    category: "Access Control",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  }
];

const ProjectGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects Gallery</h2>
          <p className="text-lg text-muted-foreground">
            Explore our recent installations and security solutions implemented for our valued clients.
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={scrollLeft}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors",
              scrollPosition <= 10 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            )}
            disabled={scrollPosition <= 10}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={cn(
                  "flex-shrink-0 w-[280px] md:w-[350px] rounded-xl overflow-hidden shadow-sm relative snap-start group cursor-pointer",
                  "opacity-0 animate-fade-in"
                )}
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-sm font-medium inline-block mb-2 bg-primary/90 py-1 px-3 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
