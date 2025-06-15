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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AdminProductsPage from "./AdminProductsPage";
import AdminPackagesPage from "./AdminPackagesPage";
import AdminProjectsPage from "./AdminProjectsPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

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

  // Main sidebar layout + nested routes for each admin section
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6">
          <SidebarTrigger className="mb-4 md:hidden" />
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
          <Routes>
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="packages" element={<AdminPackagesPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route 
              index 
              element={
                <div className="max-w-xl mx-auto px-2 py-12 text-center">
                  <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h2>
                  <p className="mb-2">Use the sidebar to manage products, packages, and your gallery.</p>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}
