
import { Camera, Shield, Sun, Zap } from "lucide-react";

const WhatWeDo = () => {
  const features = [
    {
      title: "Security Camera Installation",
      description: "Professional CCTV and surveillance system setup for complete property monitoring.",
      image: "/images/sample1.jpg",
      icon: Camera
    },
    {
      title: "Solar Power Systems",
      description: "Sustainable energy solutions for powering your security equipment and reducing costs.",
      image: "/images/solar_power.jpg",
      icon: Sun
    },
    {
      title: "Advanced Security Integration",
      description: "Seamless integration of access control, alarms, and monitoring systems.",
      image: "/images/sample3.jpg",
      icon: Shield
    },
    {
      title: "Electrical Solutions",
      description: "Complete electrical installations and maintenance for residential and commercial properties.",
      image: "/images/engineeratwork.jpg",
      icon: Zap
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Solutions for Your Safety</h2>
          <p className="text-lg text-muted-foreground">
            From advanced security systems to sustainable energy solutions, we provide end-to-end services 
            that protect your property and reduce operational costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
