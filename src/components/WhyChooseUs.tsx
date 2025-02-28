
import { Shield, Users, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Trusted Security",
    description: "Providing reliable security solutions for homes and businesses.",
    icon: Shield,
  },
  {
    title: "Expert Team",
    description: "Skilled professionals with years of industry experience.",
    icon: Users,
  },
  {
    title: "Quality Service",
    description: "Premium products and exceptional customer support.",
    icon: Award,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock assistance for your security needs.",
    icon: Clock,
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Ezton E & E?</h2>
          <p className="text-lg text-muted-foreground">
            With years of experience in security and electrical solutions, we're committed to providing cutting-edge technology and exceptional service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={cn(
                "feature-card group hover-lift",
                "opacity-0 animate-fade-in"
              )}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="p-3 rounded-full bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
