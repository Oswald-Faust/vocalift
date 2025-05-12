import React from 'react';
import Link from 'next/link';
import { Home, Settings, BarChart2, Users, FileText } from 'lucide-react';
import { useRouter } from 'next/router';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, label }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 ${isActive ? 'bg-gray-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors duration-200`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>
      
      <nav className="px-2 py-4 space-y-1">
        <SidebarLink 
          href="/dashboard" 
          icon={<Home className="w-5 h-5" />} 
          label="Overview" 
        />
        <SidebarLink 
          href="/dashboard/analytics" 
          icon={<BarChart2 className="w-5 h-5" />} 
          label="Analytics" 
        />
        <SidebarLink 
          href="/dashboard/users" 
          icon={<Users className="w-5 h-5" />} 
          label="Users" 
        />
        <SidebarLink 
          href="/dashboard/documents" 
          icon={<FileText className="w-5 h-5" />} 
          label="Documents" 
        />
        <SidebarLink 
          href="/dashboard/settings" 
          icon={<Settings className="w-5 h-5" />} 
          label="Settings" 
        />
      </nav>
    </aside>
  );
};

export default DashboardSidebar;