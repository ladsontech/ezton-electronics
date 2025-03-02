
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="bg-secondary/80 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 pb-10">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-heading font-bold">
                <span className="text-primary">Ezton</span> E & E Ltd.
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Your trusted partner in security and electrical solutions.
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
                <span className="text-muted-foreground">+256 123 456 789</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Tech Lane, Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ezton E & E Ltd. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <button 
              className="bg-primary/10 text-primary py-2 px-4 rounded-full text-sm hover:bg-primary/20 transition-colors"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Chat with us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
