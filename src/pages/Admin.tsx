
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkAdminPassword, migrateDataToSupabase } from '@/utils/adminAuth';
import { toast } from "sonner";
import { ProductsManager } from '@/components/admin/ProductsManager';
import { PackagesManager } from '@/components/admin/PackagesManager';
import { ProjectsManager } from '@/components/admin/ProjectsManager';
import { useNavigate } from "react-router-dom";
import { Package, Boxes, Image as ImageIcon, Home, LogOut } from "lucide-react";

type AdminSection = 'products' | 'packages' | 'projects';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>('products');
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

  const handleBackToWebsite = () => {
    navigate('/');
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

  const navigationItems = [
    { id: 'products' as AdminSection, label: 'Products', icon: Boxes },
    { id: 'packages' as AdminSection, label: 'Packages', icon: Package },
    { id: 'projects' as AdminSection, label: 'Gallery', icon: ImageIcon },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <ProductsManager />;
      case 'packages':
        return <PackagesManager />;
      case 'projects':
        return <ProjectsManager />;
      default:
        return <ProductsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Fixed Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToWebsite}
              className="hidden md:flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Website
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex border-t">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSection === item.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 md:pt-24 px-4 md:px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center text-xs transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleBackToWebsite}
            className="flex flex-col items-center justify-center text-xs text-gray-500"
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center text-xs text-gray-500"
          >
            <LogOut className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
