import { supabase } from './supabase';

// Types pour les utilisateurs et quotas
export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

export interface UserQuota {
  id: string;
  user_id: string;
  max_files: number;
  max_file_size: number;
  daily_file_limit: number;
  created_at: string;
  updated_at: string;
}

export interface File {
  id: string;
  user_id: string;
  filename: string;
  original_url: string;
  transcription: string | null;
  summary: string | null;
  translation: string | null;
  language: string | null;
  status: 'UPLOADED' | 'PROCESSING' | 'TRANSCRIBED' | 'SUMMARIZED' | 'TRANSLATED' | 'ERROR';
  created_at: string;
  updated_at: string;
}

// Service pour interagir avec la base de données Supabase
export const databaseService = {
  // Utilisateurs
  getUserById: async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
    
    return data as User;
  },
  
  getUserByEmail: async (email: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
    
    return data as User;
  },
  
  createUser: async (userData: { id: string; email: string; role?: 'USER' | 'ADMIN' }): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: userData.id,
        email: userData.email,
        role: userData.role || 'USER'
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      return null;
    }
    
    return data as User;
  },
  
  // Quotas utilisateur
  getUserQuota: async (userId: string): Promise<UserQuota | null> => {
    const { data, error } = await supabase
      .from('user_quotas')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error || !data) {
      console.error('Erreur lors de la récupération du quota:', error);
      return null;
    }
    
    return data as UserQuota;
  },
  
  createUserQuota: async (userId: string, quotaData?: Partial<UserQuota>): Promise<UserQuota | null> => {
    const { data, error } = await supabase
      .from('user_quotas')
      .insert([{
        user_id: userId,
        max_files: quotaData?.max_files || 10,
        max_file_size: quotaData?.max_file_size || 10485760, // 10MB
        daily_file_limit: quotaData?.daily_file_limit || 5
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création du quota:', error);
      return null;
    }
    
    return data as UserQuota;
  },
  
  // Fichiers
  getUserFiles: async (userId: string): Promise<File[]> => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des fichiers:', error);
      return [];
    }
    
    return data as File[];
  },
  
  getFileById: async (fileId: string): Promise<File | null> => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('id', fileId)
      .single();
    
    if (error || !data) {
      console.error('Erreur lors de la récupération du fichier:', error);
      return null;
    }
    
    return data as File;
  },
  
  createFile: async (fileData: Omit<File, 'id' | 'created_at' | 'updated_at'>): Promise<File | null> => {
    const { data, error } = await supabase
      .from('files')
      .insert([fileData])
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la création du fichier:', error);
      return null;
    }
    
    return data as File;
  },
  
  updateFile: async (fileId: string, fileData: Partial<File>): Promise<File | null> => {
    const { data, error } = await supabase
      .from('files')
      .update(fileData)
      .eq('id', fileId)
      .select()
      .single();
    
    if (error) {
      console.error('Erreur lors de la mise à jour du fichier:', error);
      return null;
    }
    
    return data as File;
  }
};

export default databaseService; 