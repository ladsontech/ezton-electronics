
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from './ImageUpload';
import { toast } from "sonner";
import { Trash, Edit, Check } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface Package {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  images: string[];
  created_at?: string;
  updated_at?: string;
}

export function PackagesManager() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Package>({
    id: '',
    title: '',
    description: '',
    features: [],
    price: 0,
    images: []
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentPackage(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Split by commas and trim whitespace from each feature
    const features = e.target.value.split(',').map(feature => feature.trim()).filter(feature => feature !== '');
    setCurrentPackage(prev => ({ ...prev, features }));
  };

  const handleImagesChange = (images: string[]) => {
    setCurrentPackage(prev => ({ ...prev, images }));
  };

  const resetForm = () => {
    setCurrentPackage({
      id: '',
      title: '',
      description: '',
      features: [],
      price: 0,
      images: []
    });
    setEditMode(false);
  };

  const handleEditPackage = (pkg: Package) => {
    setCurrentPackage({
      ...pkg,
      price: pkg.price || 0,
      features: pkg.features || []
    });
    setEditMode(true);
  };

  const handleDeletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPackages(packages.filter(pkg => pkg.id !== id));
      toast.success('Package deleted successfully');
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete package');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!currentPackage.title) {
        toast.error('Package title is required');
        return;
      }
      
      const packageData = {
        ...currentPackage,
        price: currentPackage.price || null,
        updated_at: new Date().toISOString()
      };
      
      if (editMode) {
        // Update existing package
        const { error } = await supabase
          .from('packages')
          .update(packageData)
          .eq('id', currentPackage.id);
          
        if (error) throw error;
        
        setPackages(packages.map(p => 
          p.id === currentPackage.id ? { ...packageData, id: currentPackage.id } : p
        ));
        toast.success('Package updated successfully');
      } else {
        // Create new package
        const { data, error } = await supabase
          .from('packages')
          .insert([{
            title: packageData.title,
            description: packageData.description,
            features: packageData.features,
            price: packageData.price,
            images: packageData.images,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select();
          
        if (error) throw error;
        
        if (data) {
          setPackages([...data, ...packages]);
          toast.success('Package created successfully');
        }
      }
      
      resetForm();
      fetchPackages(); // Refresh the package list
    } catch (error: any) {
      console.error('Error saving package:', error);
      toast.error(`Failed to save package: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="add">
        <TabsList>
          <TabsTrigger value="add">{editMode ? 'Edit Package' : 'Add Package'}</TabsTrigger>
          <TabsTrigger value="list">Package List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-4 pt-4">
          <Card className="shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle>{editMode ? 'Edit Package' : 'Add New Package'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        name="title"
                        value={currentPackage.title}
                        onChange={handleInputChange}
                        placeholder="Package Title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Price (UGX)</label>
                      <Input
                        name="price"
                        type="number"
                        value={currentPackage.price || ''}
                        onChange={handleInputChange}
                        placeholder="Price"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        name="description"
                        value={currentPackage.description || ''}
                        onChange={handleInputChange}
                        placeholder="Package Description"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Features (separate with commas)
                      </label>
                      <Textarea
                        value={currentPackage.features?.join(', ') || ''}
                        onChange={handleFeaturesChange}
                        placeholder="Enter features separated by commas (e.g., Feature 1, Feature 2, Feature 3)"
                        rows={4}
                      />
                      {currentPackage.features?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Features preview:</p>
                          <ul className="text-xs text-gray-700 pl-5 list-disc">
                            {currentPackage.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Images</label>
                    <ImageUpload
                      images={currentPackage.images || []}
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
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {editMode ? 'Update Package' : 'Add Package'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="pt-4">
          <Card className="shadow-sm border">
            <CardHeader className="pb-3">
              <CardTitle>Package List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading packages...</p>
              ) : packages.length === 0 ? (
                <p>No packages found. Add your first package!</p>
              ) : (
                <div className="space-y-4">
                  {packages.map(pkg => (
                    <div key={pkg.id} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
                      {pkg.images && pkg.images[0] && (
                        <div className="w-full md:w-36 h-36 flex-shrink-0">
                          <img 
                            src={pkg.images[0]} 
                            alt={pkg.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{pkg.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {pkg.price ? `UGX ${pkg.price}` : 'No price set'}
                        </p>
                        <p className="text-sm">{pkg.description?.substring(0, 100)}...</p>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Features:</h4>
                          <ul className="text-xs space-y-1 mt-1">
                            {pkg.features?.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <Check className="h-3 w-3 text-primary mr-1 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                            {(pkg.features?.length || 0) > 3 && (
                              <li className="text-xs text-muted-foreground">
                                +{(pkg.features?.length || 0) - 3} more features
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="mt-3 flex">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditPackage(pkg)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="ml-2 text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDeletePackage(pkg.id)}
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
