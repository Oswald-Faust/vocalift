import { createClient } from '@supabase/supabase-js'

// Définition du type d'environnement pour les variables Supabase
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    }
  }
}

// Validation des variables d'environnement
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL est manquant')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY est manquant')
}

// Création du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Constantes pour les buckets de storage
export const AUDIO_BUCKET_NAME = 'audio-files'

// Fonctions utilitaires pour l'authentification
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signInWithMagicLink = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Fonctions utilitaires pour le stockage de fichiers
export const uploadAudioFile = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(AUDIO_BUCKET_NAME)
    .upload(fileName, file)
    
  return { data, error }
}

export const getAudioFileUrl = (filePath: string) => {
  const { data } = supabase.storage
    .from(AUDIO_BUCKET_NAME)
    .getPublicUrl(filePath)
    
  return data.publicUrl
}

export const deleteAudioFile = async (filePath: string) => {
  const { error } = await supabase.storage
    .from(AUDIO_BUCKET_NAME)
    .remove([filePath])
    
  return { error }
} 