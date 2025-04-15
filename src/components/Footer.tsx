import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return <footer className="bg-secondary/80 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2">
                  <img 
                    src="/lovable-uploads/d315587b-d7ed-4d20-ac96-ba439a5e5682.png" 
                    alt="Ezton Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h2 className="text-2xl font-heading font-bold">
                  <span className="text-red-700">Ezton</span> E&E Ltd.
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Quality with standards
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              </li>
              <li>
                <a href="#products" className="text-muted-foreground hover:text-primary transition-colors">Products</a>
              </li>
              <li>
                <a href="#packages" className="text-muted-foreground hover:text-primary transition-colors">Packages</a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">info@ezton.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">+256 778 648157</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">OPP-JALIA TOWER, UMOJA HOUSE,  BANDA Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ezton E & E Ltd. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href={`https://wa.me/256778648157?text=${encodeURIComponent("Hello, I'm interested in your services and would like more information.")}`} target="_blank" rel="noopener noreferrer" className="bg-primary/10 text-primary py-2 px-4 rounded-full text-sm hover:bg-primary/20 transition-colors">
              Chat with us
            </a>
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;
