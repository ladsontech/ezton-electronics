
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Our Projects Gallery</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Explore our recent installations and security solutions implemented for our valued clients.
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={scrollLeft}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-md hover:bg-white transition-colors",
              scrollPosition <= 10 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            )}
            disabled={scrollPosition <= 10}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth snap-x scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={cn(
                  "flex-shrink-0 w-[180px] sm:w-[220px] md:w-[250px] rounded-xl overflow-hidden shadow-sm relative snap-start group cursor-pointer",
                  "opacity-0 animate-fade-in hover:shadow-md transition-all duration-300"
                )}
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <a 
                  href={`https://wa.me/256778648157?text=${encodeURIComponent(`Hello, I'm interested in your ${project.category} services. Can you provide more information?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Enhanced Blurred Logo Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-36 h-36 md:w-48 md:h-48 opacity-20 transform rotate-12">
                        <img 
                          src="/images/ezton_logo.png" 
                          alt="Ezton Watermark" 
                          className="w-full h-full object-contain filter blur-[2px]"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
