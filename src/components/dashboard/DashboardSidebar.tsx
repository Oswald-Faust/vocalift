import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface DashboardSidebarProps {
  navItems: NavItem[];
  userNavigation: NavItem[];
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  navItems,
  userNavigation,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const location = useLocation();

  const Sidebar = () => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-darkBlue/50 backdrop-blur-md px-6 pb-4 border-r border-gray-800">
      <div className="flex h-16 shrink-0 items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-primary-500/30"
            />
            <Volume2 className="w-5 h-5 text-primary-400 relative z-10" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight">Vocalift</span>
          )}
        </Link>
      </div>
      
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6
                        ${isActive 
                          ? 'bg-primary-500/20 text-primary-400' 
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${
                          isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          
          <li className="mt-auto">
            <ul role="list" className="-mx-2 space-y-1">
              {userNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6
                        ${isActive 
                          ? 'bg-primary-500/20 text-primary-400' 
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${
                          isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        }`}
      >
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-gray-900/80 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-darkBlue px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 4,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-primary-500/30"
                    />
                    <Volume2 className="w-5 h-5 text-primary-400 relative z-10" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">Vocalift</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <Link
                          key={item.label}
                          to={item.href}
                          className={`
                            -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7
                            ${isActive 
                              ? 'bg-primary-500/20 text-primary-400' 
                              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                            }
                          `}
                          onClick={() => setIsMobileOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-6 w-6" />
                            {item.label}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="py-6">
                    {userNavigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <Link
                          key={item.label}
                          to={item.href}
                          className={`
                            -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7
                            ${isActive 
                              ? 'bg-primary-500/20 text-primary-400' 
                              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                            }
                          `}
                          onClick={() => setIsMobileOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-6 w-6" />
                            {item.label}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;