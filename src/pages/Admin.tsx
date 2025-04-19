
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkAdminPassword } from '@/utils/adminAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPassword(password)) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      toast({
        title: "Success",
        description: "Welcome to admin panel",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      });
    }
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
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem('adminAuth');
              setIsAuthenticated(false);
              navigate('/');
            }}
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            {/* Product management will be implemented in a separate component */}
          </TabsContent>
          <TabsContent value="packages">
            {/* Package management will be implemented in a separate component */}
          </TabsContent>
          <TabsContent value="projects">
            {/* Project management will be implemented in a separate component */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
