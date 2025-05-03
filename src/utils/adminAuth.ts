
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_PASSWORD = 'ezton2025';

export const checkAdminPassword = (password: string) => {
  return password === ADMIN_PASSWORD;
};

// Function to help migrate hardcoded data to Supabase
export const migrateDataToSupabase = async () => {
  try {
    // Sample products data
    const products = [
      {
        title: "Hikvision Color HD CCTV Camera",
        description: "24/7 color surveillance with 1080p Full HD resolution",
        features: [
          "24/7 Color Surveillance",
          "1080p Full HD resolution",
          "Advanced color imaging technology",
          "30m infrared night vision",
          "Weatherproof IP67 rating",
          "Motion detection alerts",
          "Cloud storage support",
          "Remote mobile access",
          "2-way audio communication",
          "120° viewing angle"
        ],
        price: 450000,
        images: ["/images/hikvision.jpg", "/images/sample1.jpg", "/images/sample2.jpg"]
      },
      {
        title: "PTZ Dual Lens Solar Camera",
        description: "Dual lens system with fixed + 360° rotating cameras",
        features: [
          "Dual Lens System",
          "Fixed + 360° rotating cameras",
          "4G connectivity (SIM card)",
          "Solar powered operation",
          "50m night vision",
          "Human detection",
          "Waterproof IP66",
          "Real-time alerts",
          "Cloud/SD storage",
          "Global smartphone access"
        ],
        price: 850000,
        images: ["/images/solar_ptz.jpg", "/images/sample3.jpg", "/images/sample4.jpg"]
      },
      {
        title: "Solar Star Street Light",
        description: "Smart solar lighting with 50W LED output",
        features: [
          "Smart Solar Lighting",
          "50W LED output",
          "Automatic operation",
          "2-day battery backup",
          "IP65 weatherproof",
          "Adjustable height",
          "Motion sensor",
          "Wide illumination",
          "Easy installation",
          "Overcharge protection"
        ],
        price: 350000,
        images: ["/images/solar_power.jpg", "/images/sample5.jpg", "/images/sample6.jpg"]
      }
    ];

    // Sample packages data
    const packages = [
      {
        title: "5-Star Gold Package",
        description: "Our premium package offering comprehensive security coverage with the latest technology.",
        features: [
          "2,300W floodlights",
          "3-in-1 PTZ solar camera",
          "20ft/5M pole",
          "Anti-climbers",
          "Full installation",
          "1-year guarantee"
        ],
        price: 1700000,
        images: ["/images/solar_ptz.jpg", "/images/solar_flood_light.jpg", "/images/sample1.jpg"]
      },
      {
        title: "Gold Package",
        description: "A comprehensive security solution with advanced features for enhanced protection.",
        features: [
          "2,300W floodlights",
          "2-in-1 PTZ solar camera",
          "20ft/5M pole",
          "Anti-climbers",
          "Full installation",
          "1-year guarantee"
        ],
        price: 1500000,
        images: ["/images/solar_ptz.jpg", "/images/solar_power.jpg", "/images/sample2.jpg"]
      },
      {
        title: "Silver Package",
        description: "A balanced security package offering essential features for reliable surveillance.",
        features: [
          "1,300W solar floodlights",
          "2-in-1 PTZ solar camera",
          "20ft/5M pole",
          "Anti-climbers",
          "Full installation",
          "1-year guarantee"
        ],
        price: 1250000,
        images: ["/images/solar_power.jpg", "/images/solar_flood_light.jpg", "/images/sample3.jpg"]
      }
    ];

    // Sample gallery items from projects
    const galleryItems = [
      {
        image_url: "/images/sample1.jpg"
      },
      {
        image_url: "/images/sample2.jpg"
      },
      {
        image_url: "/images/sample3.jpg"
      }
    ];

    // Check if data already exists to avoid duplicates
    const { data: existingProducts } = await supabase.from('products').select('id');
    const { data: existingPackages } = await supabase.from('packages').select('id');
    const { data: existingGallery } = await supabase.from('gallery').select('id');

    // Only insert if no data exists
    if (existingProducts && existingProducts.length === 0) {
      const { error: productsError } = await supabase.from('products').insert(products);
      if (productsError) throw productsError;
      toast.success('Sample products migrated to database');
    }

    if (existingPackages && existingPackages.length === 0) {
      const { error: packagesError } = await supabase.from('packages').insert(packages);
      if (packagesError) throw packagesError;
      toast.success('Sample packages migrated to database');
    }

    if (existingGallery && existingGallery.length === 0) {
      const { error: galleryError } = await supabase.from('gallery').insert(galleryItems);
      if (galleryError) throw galleryError;
      toast.success('Sample gallery items migrated to database');
    }

    return true;
  } catch (error) {
    console.error('Error migrating data:', error);
    toast.error('Failed to migrate sample data');
    return false;
  }
};
