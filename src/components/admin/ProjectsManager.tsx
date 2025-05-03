
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from './ImageUpload';
import { toast } from "sonner";
import { Trash, Edit, X } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// Interface for gallery items
interface GalleryItem {
  id: number;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

export function ProjectsManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleImagesChange = (images: string[]) => {
    setCurrentImages(images);
  };

  const resetForm = () => {
    setCurrentImages([]);
    setEditingItem(null);
  };

  const handleEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    setCurrentImages(item.image_url ? [item.image_url] : []);
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setGalleryItems(galleryItems.filter(item => item.id !== id));
      toast.success('Gallery item deleted successfully');
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast.error('Failed to delete gallery item');
    }
  };

  // Add images to gallery table
  const addImagesToGallery = async (imageUrls: string[]) => {
    try {
      // Prepare gallery items
      const galleryItems = imageUrls.map(url => ({
        image_url: url
      }));
      
      // Add to gallery table
      const { error } = await supabase
        .from('gallery')
        .insert(galleryItems);
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding images to gallery:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (currentImages.length === 0) {
        toast.error('Please add at least one image');
        return;
      }
      
      if (editingItem) {
        // For each image in the editing project, update its image_url
        const updatePromises = currentImages.map((imageUrl, index) => {
          if (index === 0 && editingItem.id !== undefined) {
            // Update the first image in the existing gallery item
            return supabase
              .from('gallery')
              .update({ image_url: imageUrl })
              .eq('id', editingItem.id);
          } else {
            // Insert additional images as new gallery items
            return supabase
              .from('gallery')
              .insert({ image_url: imageUrl });
          }
        });
        
        await Promise.all(updatePromises);
        toast.success('Gallery images updated successfully');
      } else {
        // Add new images to gallery
        await addImagesToGallery(currentImages);
        toast.success('Images added to gallery successfully');
      }
      
      // Refresh the gallery items
      await fetchGalleryItems();
      resetForm();
    } catch (error) {
      console.error('Error saving images:', error);
      toast.error('Failed to save images');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border">
        <CardHeader className="pb-3">
          <CardTitle>{editingItem ? 'Edit Gallery Image' : 'Add Gallery Images'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <ImageUpload
                images={currentImages}
                onChange={handleImagesChange}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              {editingItem && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
              )}
              <Button type="submit" disabled={currentImages.length === 0}>
                {editingItem ? 'Update Image' : 'Add to Gallery'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm border">
        <CardHeader className="pb-3">
          <CardTitle>Project Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading gallery images...</p>
          ) : galleryItems.length === 0 ? (
            <p>No images found. Add your first gallery images!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryItems.map(item => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={item.image_url} 
                      alt={`Gallery image ${item.id}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="scale-90 group-hover:scale-100 transition-transform"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="scale-90 group-hover:scale-100 transition-transform"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
