import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
const contactInfo = [{
  title: "Phone",
  details: ["+256 778 648157", "+256755967110"],
  icon: Phone
}, {
  title: "Email",
  details: ["eztonelectronicsandengineering@gmail.com"],
  icon: Mail
}, {
  title: "Location",
  details: ["OPP-JALIA TOWER", "UMOJA HOUSE, Kampala, Uganda"],
  icon: MapPin
}, {
  title: "Business Hours",
  details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM"],
  icon: Clock
}];
const ContactSection = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format message for WhatsApp
    const formattedMessage = `
*Inquiry from Ezton Website*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Message:* ${formData.message}
    `.trim();

    // Open WhatsApp with preloaded message
    window.open(`https://wa.me/256778648157?text=${encodeURIComponent(formattedMessage)}`, "_blank");

    // Show success toast
    toast({
      title: "Message sent!",
      description: "Redirecting you to WhatsApp to continue the conversation."
    });

    // Reset form after short delay
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 500);
  };
  return <section id="contact" className="py-12 md:py-20 relative">
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Get in Touch</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Have questions about our products or services? Our team is here to help.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <Card className="bg-white shadow-sm mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((item, index) => <div key={item.title} className={cn("group", "opacity-0 animate-fade-in")} style={{
                  animationDelay: `${0.1 + index * 0.1}s`,
                  animationFillMode: "forwards"
                }}>
                      <div className="p-2 sm:p-3 rounded-full bg-primary/10 w-fit mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                      <div className="space-y-1">
                        {item.details.map(detail => <p key={detail} className="text-sm text-muted-foreground sm:text-xs">{detail}</p>)}
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-secondary/20 p-5 rounded-lg border border-border/40 shadow-sm opacity-0 animate-fade-in" style={{
            animationDelay: "0.5s",
            animationFillMode: "forwards"
          }}>
              <h3 className="text-lg font-semibold mb-3">Find Us</h3>
              <div className="aspect-video rounded-md overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7598116193974!2d32.634470116139854!3d0.3442541638976192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjAnMzkuMyJOIDMywrAzOCcxMi4wIkU!5e0!3m2!1sen!2sus!4v1712343652956!5m2!1sen!2sus" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ezton location" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-border/40 p-5 md:p-8 opacity-0 animate-fade-in" style={{
          animationDelay: "0.5s",
          animationFillMode: "forwards"
        }}>
            <h3 className="text-xl md:text-2xl font-semibold mb-5">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 sm:mb-2">
                  Name
                </label>
                <input id="name" name="name" type="text" required placeholder="Your name" className="form-input" value={formData.name} onChange={handleChange} />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 sm:mb-2">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="Your email" className="form-input" value={formData.email} onChange={handleChange} />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 sm:mb-2">
                  Message
                </label>
                <textarea id="message" name="message" rows={3} required placeholder="Your message" className="form-input" value={formData.message} onChange={handleChange} />
              </div>
              
              <button type="submit" className="btn-primary w-full flex items-center justify-center" disabled={isSubmitting}>
                {isSubmitting ? <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span> : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;