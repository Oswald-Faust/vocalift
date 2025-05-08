import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Plus, Bell, ChevronDown } from 'lucide-react';
import Button from '../Button';

interface DashboardHeaderProps {
  setMobileMenuOpen: (open: boolean) => void;
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  setMobileMenuOpen,
  userName
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-darkBlue/50 backdrop-blur-md border-b border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 justify-end items-center gap-x-4 lg:gap-x-6">
            <Button
              variant="primary"
              className="hidden sm:flex"
              icon={<Plus className="w-4 h-4" />}
            >
              Nouveau projet
            </Button>

            <button
              type="button"
              className="relative rounded-full bg-darkBlue/50 p-2 text-gray-400 hover:text-gray-300"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary-500"></span>
            </button>

            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-x-4 rounded-full bg-darkBlue/50 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-darkBlue/70"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <img
                  className="h-8 w-8 rounded-full bg-gray-800"
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt=""
                />
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-4 text-sm font-medium text-gray-300">
                    {userName}
                  </span>
                  <ChevronDown
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-darkBlue py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      Mon profil
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      Paramètres
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      Déconnexion
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;