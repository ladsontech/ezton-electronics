
import { Facebook, Instagram } from "lucide-react";
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
            <div className="flex space-x-4 justify-center">
              <a href="https://www.facebook.com/share/1FS48mXRi1/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/ezton.e_e.ltd?igsh=ODRqcDl1NWU2ODMw&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@ezton.e.e.ltd?_t=ZM-8vY3yIK2gzd&_r=1" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors" aria-label="TikTok">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.321 5.562a5.124 5.124 0 01-5.121-5.121h-3.584v13.636c0 1.885-1.53 3.415-3.415 3.415a3.415 3.415 0 01-3.415-3.415 3.415 3.415 0 013.415-3.415c.423 0 .847.085 1.235.254v-3.6a6.945 6.945 0 00-1.235-.113 7.023 7.023 0 00-7.023 7.023 7.023 7.023 0 007.023 7.023 7.023 7.023 0 007.023-7.023V8.488a8.7 8.7 0 005.121 1.65v-3.415a5.123 5.123 0 01-.024-1.162z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="text-muted-foreground">eztonelectronicsandengineering.com</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-muted-foreground">+256 778 648157</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
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
