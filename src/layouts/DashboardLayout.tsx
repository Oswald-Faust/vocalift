import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FolderOpen, 
  Mic, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Accueil', href: '/dashboard' },
    { icon: FolderOpen, label: 'Mes projets', href: '/dashboard/projects' },
    { icon: Mic, label: 'Traduire un audio', href: '/dashboard/translate' },
    { icon: History, label: 'Historique', href: '/dashboard/history' },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
  ];

  const userNavigation = [
    { icon: User, label: 'Mon profil', href: '/dashboard/profile' },
    { icon: LogOut, label: 'Déconnexion', href: '/login' },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <DashboardSidebar 
        navItems={navItems}
        userNavigation={userNavigation}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />
      
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <DashboardHeader 
          setMobileMenuOpen={setIsMobileSidebarOpen}
          userName="Thomas"
        />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;