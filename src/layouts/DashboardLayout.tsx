import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
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
  User,
  Menu
} from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode
}

interface UserData {
  id: string;
  email?: string;
  [key: string]: any;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [, setUser] = useState<UserData | null>(null)
  const [, setIsAdmin] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser()
      
      if (error || !data.user) {
        router.push('/Login')
        return
      }
      
      setUser(data.user)
      setUserName(data.user.email || 'Utilisateur');
      
      // Vérifier si l'utilisateur est admin
      try {
        const response = await fetch(`/api/users/${data.user.id}/role`)
        const userData = await response.json()
        setIsAdmin(userData.role === 'ADMIN')
      } catch (err) {
        console.error('Erreur lors de la vérification du rôle:', err)
      }
    }
    
    checkAuth()
  }, [router])
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/Login')
  }
  
  const isActive = (path: string) => {
    return router.pathname === path
      ? 'bg-indigo-800 text-white'
      : 'text-indigo-100 hover:bg-indigo-700'
  }

  const navItems = [
    { icon: Home, label: 'Accueil', href: '/dashboard' },
    { icon: FolderOpen, label: 'Mes projets', href: '/dashboard/projects' },
    { icon: Mic, label: 'Traduire un audio', href: '/dashboard/translate' },
    { icon: History, label: 'Historique', href: '/dashboard/history' },
    { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
  ];

  const userNavigation = [
    { icon: User, label: 'Mon profil', href: '/dashboard/profile' },
    { icon: LogOut, label: 'Déconnexion', href: '/Login' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>
      
      {/* Mobile sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Background overlay */}
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileSidebarOpen(false)}></div>
          
          {/* Sidebar content */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <DashboardSidebar />
          </div>
        </div>
      )}
      
      {/* Header and main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <DashboardHeader setMobileMenuOpen={setIsMobileSidebarOpen} userName={userName} />
        
        <main className="flex-1 py-6 px-4 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}