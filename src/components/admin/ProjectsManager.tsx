
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from './ImageUpload';
import { toast } from "sonner";
import { Trash, Edit, CalendarIcon } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  completion_date: string | null;
  images: string[];
  created_at?: string;
  updated_at?: string;
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    id: '',
    title: '',
    description: '',
    location: '',
    completion_date: null,
    images: []
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setCurrentProject(prev => ({ 
      ...prev, 
      completion_date: date ? format(date, 'yyyy-MM-dd') : null 
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setCurrentProject(prev => ({ ...prev, images }));
  };

  const resetForm = () => {
    setCurrentProject({
      id: '',
      title: '',
      description: '',
      location: '',
      completion_date: null,
      images: []
    });
    setEditMode(false);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject({
      ...project,
      images: project.images || []
    });
    setEditMode(true);
  };

  const handleDeleteProject = async (id: string) => {
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
      if (!currentProject.title) {
        toast.error('Project title is required');
        return;
      }
      
      const projectData = {
        ...currentProject,
        updated_at: new Date().toISOString()
      };
      
      if (editMode) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', currentProject.id);
          
        if (error) throw error;
        
        setProjects(projects.map(p => 
          p.id === currentProject.id ? { ...projectData, id: currentProject.id } : p
        ));
        toast.success('Project updated successfully');
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select();
          
        if (error) throw error;
        
        setProjects([...(data || []), ...projects]);
        toast.success('Project created successfully');
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="add">
        <TabsList>
          <TabsTrigger value="add">{editMode ? 'Edit Project' : 'Add Project'}</TabsTrigger>
          <TabsTrigger value="list">Project List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editMode ? 'Edit Project' : 'Add New Project'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        name="title"
                        value={currentProject.title}
                        onChange={handleInputChange}
                        placeholder="Project Title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <Input
                        name="location"
                        value={currentProject.location}
                        onChange={handleInputChange}
                        placeholder="Project Location"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Completion Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !currentProject.completion_date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {currentProject.completion_date ? format(new Date(currentProject.completion_date), 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={currentProject.completion_date ? new Date(currentProject.completion_date) : undefined}
                            onSelect={handleDateChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        name="description"
                        value={currentProject.description}
                        onChange={handleInputChange}
                        placeholder="Project Description"
                        rows={6}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Images</label>
                    <ImageUpload
                      images={currentProject.images || []}
                      onChange={handleImagesChange}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2 justify-end">
                  {editMode && (
                    <Button variant="outline" type="button" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                  <Button type="submit">
                    {editMode ? 'Update Project' : 'Add Project'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Project List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading projects...</p>
              ) : projects.length === 0 ? (
                <p>No projects found. Add your first project!</p>
              ) : (
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
                      <div className="md:w-36 h-36 flex-shrink-0 grid grid-cols-2 gap-1 rounded-md overflow-hidden">
                        {project.images && project.images.length > 0 ? (
                          project.images.slice(0, 4).map((image, idx) => (
                            <div key={idx} className={`${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                              <img 
                                src={image} 
                                alt={`${project.title} - ${idx}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 row-span-2 bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">No images</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{project.title}</h3>
                        <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mb-2">
                          {project.location && (
                            <span>{project.location}</span>
                          )}
                          {project.completion_date && (
                            <span>Completed: {format(new Date(project.completion_date), 'PP')}</span>
                          )}
                        </div>
                        <p className="text-sm">{project.description?.substring(0, 100)}...</p>
                        <div className="mt-3 flex">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditProject(project)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="ml-2"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
