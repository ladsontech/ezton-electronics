import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return <footer className="bg-secondary/80 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          <div>
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 mb-2">
                <img 
                  src="/images/ezton_logo.png" 
                  alt="Ezton Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-heading font-bold">
                  <span className="text-black">Ezton E&E Ltd</span>
                </h2>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <div className="h-px w-8 bg-black"></div>
                  <span className="text-sm text-red-600 italic">
                    Quality with standards
                  </span>
                  <div className="h-px w-8 bg-black"></div>
                </div>
              </div>
            </div>
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
                <span className="text-muted-foreground">eztonelectronicsandengineering.com</span>
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
