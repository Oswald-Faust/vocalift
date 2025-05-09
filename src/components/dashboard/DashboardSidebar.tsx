import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, BarChart2, Users, FileText } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>
      
      <nav className="px-2 py-4 space-y-1">
        <SidebarLink 
          to="/dashboard" 
          icon={<Home className="w-5 h-5" />} 
          label="Overview" 
        />
        <SidebarLink 
          to="/dashboard/analytics" 
          icon={<BarChart2 className="w-5 h-5" />} 
          label="Analytics" 
        />
        <SidebarLink 
          to="/dashboard/users" 
          icon={<Users className="w-5 h-5" />} 
          label="Users" 
        />
        <SidebarLink 
          to="/dashboard/documents" 
          icon={<FileText className="w-5 h-5" />} 
          label="Documents" 
        />
        <SidebarLink 
          to="/dashboard/settings" 
          icon={<Settings className="w-5 h-5" />} 
          label="Settings" 
        />
      </nav>
    </aside>
  );
};

export default DashboardSidebar;