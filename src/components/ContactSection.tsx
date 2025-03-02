
import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    title: "Phone",
    details: ["+256 778 648157"],
    icon: Phone,
  },
  {
    title: "Email",
    details: ["info@ezton.com"],
    icon: Mail,
  },
  {
    title: "Location",
    details: ["OPP-JALIA TOWER", "UMOJA HOUSE, Kampala, Uganda"],
    icon: MapPin,
  },
  {
    title: "Business Hours",
    details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM"],
    icon: Clock,
  },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Redirect to WhatsApp
    window.open(
      `https://wa.me/256778648157?text=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
      )}`,
      "_blank"
    );
    
    // Show toast and reset form
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Redirecting you to WhatsApp to continue the conversation.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="contact" className="py-12 md:py-20 relative">
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Get in Touch</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Have questions about our products or services? Our team is here to help.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {contactInfo.map((item, index) => (
              <div 
                key={item.title}
                className={cn(
                  "feature-card group p-4 sm:p-6",
                  "opacity-0 animate-fade-in"
                )}
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="p-2 sm:p-3 rounded-full bg-primary/10 w-fit mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail) => (
                    <p key={detail} className="text-sm sm:text-base text-muted-foreground">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="bg-white rounded-2xl shadow-sm border border-border/40 p-5 md:p-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-5">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 sm:mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 sm:mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 sm:mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Your message"
                  className="form-input"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
