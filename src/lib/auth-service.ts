import axios from 'axios';
import { supabase } from './supabase';

// Types pour les utilisateurs et sessions
export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
  quota?: UserQuota;
}

export interface UserQuota {
  id: string;
  userId: string;
  maxFiles: number;
  maxFileSize: number;
  dailyFileLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

// Services d'authentification
export const authService = {
  // Récupérer la session actuelle
  getCurrentSession: async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return null;
    }
    return data.session as Session;
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: async (): Promise<User | null> => {
    const { data: authData } = await supabase.auth.getUser();
    
    if (!authData.user) {
      return null;
    }
    
    try {
      // Récupérer les données utilisateur depuis notre API
      const response = await axios.get('/api/auth/user');
      return response.data.user;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  },

  // Connexion
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
  },

  // Inscription
  register: async (email: string, password: string, fullName: string): Promise<{ message: string }> => {
    const response = await axios.post('/api/auth/register', { email, password, fullName });
    return response.data;
  },

  // Déconnexion
  logout: async (): Promise<void> => {
    await axios.post('/api/auth/logout');
    localStorage.removeItem('userSession');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: async (): Promise<boolean> => {
    const session = await authService.getCurrentSession();
    return !!session;
  },

  // Vérifier si l'utilisateur est admin
  isAdmin: async (): Promise<boolean> => {
    const user = await authService.getCurrentUser();
    return user?.role === 'ADMIN';
  }
};

export default authService; 