import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from './ImageUpload';
import { toast } from "sonner";
import { Trash, Plus, Edit, X } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: number;
  title: string;
  images: string[];
  created_at?: string;
  image_url?: string | null;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, images, image_url, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to ensure it has the images array property
      const transformedData = data?.map(project => ({
        ...project,
        // If project has image_url but no images array, create an images array with the image_url
        images: project.images || (project.image_url ? [project.image_url] : [])
      })) || [];
      
      setProjects(transformedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImagesChange = (images: string[]) => {
    setCurrentImages(images);
    if (editingProject) {
      setEditingProject({...editingProject, images});
    }
  };

  const resetForm = () => {
    setCurrentImages([]);
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCurrentImages(project.images || []);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProjects(projects.filter(project => project.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (currentImages.length === 0) {
        toast.error('Please add at least one image');
        return;
      }
      
      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({
            images: currentImages,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingProject.id);
          
        if (error) throw error;
        
        setProjects(projects.map(p => 
          p.id === editingProject.id ? {...p, images: currentImages} : p
        ));
        toast.success('Project images updated successfully');
      } else {
        // Create a simple title based on the date
        const title = `Project ${new Date().toLocaleDateString()}`;
        
        const projectData = {
          title,
          images: currentImages,
          updated_at: new Date().toISOString()
        };
        
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select();
          
        if (error) throw error;
        
        if (data) {
          const newProjects = data.map(project => ({
            ...project,
            images: project.images || []
          }));
          setProjects([...newProjects, ...projects]);
          toast.success('Project images added successfully');
        }
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border">
        <CardHeader className="pb-3">
          <CardTitle>{editingProject ? 'Edit Project Images' : 'Add Project Images'}</CardTitle>
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
              {editingProject && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
              )}
              <Button type="submit" disabled={currentImages.length === 0}>
                {editingProject ? 'Update Images' : 'Add to Gallery'}
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
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p>No projects found. Add your first project images!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {projects.map(project => {
                // Get the first image from images array or use image_url as fallback
                const displayImage = project.images?.[0] || project.image_url || "/placeholder.svg";
                
                return (
                  <div key={project.id} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={displayImage} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="scale-90 group-hover:scale-100 transition-transform"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="scale-90 group-hover:scale-100 transition-transform"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    {project.images && project.images.length > 1 && (
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full">
                        +{project.images.length - 1}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
