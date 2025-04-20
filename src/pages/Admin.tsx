import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkAdminPassword, migrateDataToSupabase } from '@/utils/adminAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ProductsManager } from '@/components/admin/ProductsManager';
import { PackagesManager } from '@/components/admin/PackagesManager';
import { ProjectsManager } from '@/components/admin/ProjectsManager';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPassword(password)) {
      setIsAuthenticated(true);
      
      const wasLoggedInBefore = localStorage.getItem('adminAuth') === 'true';
      localStorage.setItem('adminAuth', 'true');
      
      if (!wasLoggedInBefore) {
        setIsFirstLogin(true);
        const migrationResult = await migrateDataToSupabase();
        if (migrationResult) {
          toast.success("Sample data migrated to database successfully");
        }
      }
      
      toast.success("Welcome to admin panel");
    } else {
      toast.error("Invalid password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/');
    toast.success("You have been logged out from the admin panel");
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(isAdmin);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="mb-4"
            />
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-xs text-center mt-4 text-muted-foreground">
              Use password: ezton2025
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {isFirstLogin && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Welcome to your new admin panel!</p>
            <p className="text-sm">Sample data has been migrated to your database. You can now manage your products, packages, and projects.</p>
          </div>
        )}

        <Tabs defaultValue="products">
          <TabsList className="w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger value="products" className="data-[state=active]:bg-white rounded-none border-b-2 data-[state=active]:border-primary">Products</TabsTrigger>
            <TabsTrigger value="packages" className="data-[state=active]:bg-white rounded-none border-b-2 data-[state=active]:border-primary">Packages</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-white rounded-none border-b-2 data-[state=active]:border-primary">Image Gallery</TabsTrigger>
          </TabsList>
          
          <div className="pt-6">
            <TabsContent value="products" className="mt-0">
              <ProductsManager />
            </TabsContent>
            <TabsContent value="packages" className="mt-0">
              <PackagesManager />
            </TabsContent>
            <TabsContent value="projects" className="mt-0">
              <ProjectsManager />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
