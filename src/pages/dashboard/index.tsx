import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import AudioUploader from '@/components/dashboard/AudioUploader'
import FileList from '@/components/dashboard/FileList'
import DashboardLayout from '@/layouts/DashboardLayout'

// Définir manuellement le type File pour correspondre au schéma Prisma
type FileStatus = 'UPLOADED' | 'PROCESSING' | 'TRANSCRIBED' | 'SUMMARIZED' | 'TRANSLATED' | 'ERROR';

type FileType = {
  id: string;
  userId: string;
  filename: string;
  originalUrl: string;
  transcription?: string | null;
  summary?: string | null;
  translation?: string | null;
  language?: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: FileStatus;
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string | undefined } | null>(null)
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState<FileType[]>([])

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/Login')
        return
      }
      
      setUser({
        id: data.user.id,
        email: data.user.email
      })
      
      fetchFiles(data.user.id)
    }

    checkUser()
  }, [router])

  // Récupérer les fichiers de l'utilisateur
  const fetchFiles = async (userId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/files?userId=${userId}`)
      const data = await response.json()
      
      if (response.ok) {
        setFiles(data)
      } else {
        console.error('Erreur lors de la récupération des fichiers:', data.error)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers:', error)
    } finally {
      setLoading(false)
    }
  }

  // Gestionnaire pour l'ajout d'un nouveau fichier
  const handleFileAdded = (newFile: FileType) => {
    setFiles(prev => [newFile, ...prev])
  }

  // Gestionnaire pour la suppression d'un fichier
  const handleFileDeleted = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenue sur Vocalift</h1>
          <p className="text-gray-600">
            Convertissez vos audios en texte, résumez et traduisez-les facilement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Colonne de gauche - Uploader */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Ajouter un fichier audio</h2>
              <AudioUploader 
                userId={user.id} 
                onFileAdded={handleFileAdded} 
              />
            </div>
          </div>

          {/* Colonne de droite - Liste des fichiers */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Vos fichiers audio</h2>
              {loading ? (
                <div className="text-center py-8">Chargement de vos fichiers...</div>
              ) : (
                <FileList 
                  files={files} 
                  onFileDeleted={handleFileDeleted} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 