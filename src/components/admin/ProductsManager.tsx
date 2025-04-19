
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from './ImageUpload';
import { toast } from "sonner";
import { Trash, Edit, Plus } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  images: string[];
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

interface Category {
  id: string;
  name: string;
}

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: '',
    title: '',
    description: '',
    features: [],
    price: 0,
    images: [],
    category_id: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').filter(feature => feature.trim() !== '');
    setCurrentProduct(prev => ({ ...prev, features }));
  };

  const handleImagesChange = (images: string[]) => {
    setCurrentProduct(prev => ({ ...prev, images }));
  };

  const resetForm = () => {
    setCurrentProduct({
      id: '',
      title: '',
      description: '',
      features: [],
      price: 0,
      images: [],
      category_id: categories[0]?.id || ''
    });
    setEditMode(false);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct({
      ...product,
      price: product.price || 0,
      features: product.features || []
    });
    setEditMode(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!currentProduct.title) {
        toast.error('Product title is required');
        return;
      }
      
      const productData = {
        ...currentProduct,
        updated_at: new Date().toISOString()
      };
      
      if (editMode) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', currentProduct.id);
          
        if (error) throw error;
        
        setProducts(products.map(p => 
          p.id === currentProduct.id ? { ...productData, id: currentProduct.id } : p
        ));
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select();
          
        if (error) throw error;
        
        setProducts([...(data || []), ...products]);
        toast.success('Product created successfully');
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="add">
        <TabsList>
          <TabsTrigger value="add">{editMode ? 'Edit Product' : 'Add Product'}</TabsTrigger>
          <TabsTrigger value="list">Product List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editMode ? 'Edit Product' : 'Add New Product'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input
                        name="title"
                        value={currentProduct.title}
                        onChange={handleInputChange}
                        placeholder="Product Title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        name="category_id"
                        value={currentProduct.category_id}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Price (UGX)</label>
                      <Input
                        name="price"
                        type="number"
                        value={currentProduct.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        name="description"
                        value={currentProduct.description}
                        onChange={handleInputChange}
                        placeholder="Product Description"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Features (one per line)</label>
                      <Textarea
                        value={currentProduct.features?.join('\n') || ''}
                        onChange={handleFeaturesChange}
                        placeholder="Enter features (one per line)"
                        rows={6}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Images</label>
                    <ImageUpload
                      images={currentProduct.images || []}
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
                    {editMode ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Product List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading products...</p>
              ) : products.length === 0 ? (
                <p>No products found. Add your first product!</p>
              ) : (
                <div className="space-y-4">
                  {products.map(product => (
                    <div key={product.id} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
                      {product.images && product.images[0] && (
                        <div className="w-full md:w-36 h-36 flex-shrink-0">
                          <img 
                            src={product.images[0]} 
                            alt={product.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{product.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {categories.find(c => c.id === product.category_id)?.name || 'Uncategorized'} | 
                          {product.price ? ` UGX ${product.price}` : ' No price set'}
                        </p>
                        <p className="text-sm">{product.description?.substring(0, 100)}...</p>
                        <div className="mt-3 flex">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="ml-2"
                            onClick={() => handleDeleteProduct(product.id)}
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
