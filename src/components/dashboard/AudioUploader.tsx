import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadAudioFile } from '@/lib/supabase'

// Définir nos propres types pour correspondre au schéma Prisma
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

interface AudioUploaderProps {
  userId: string
  onFileAdded: (file: FileType) => void
}

export default function AudioUploader({ userId, onFileAdded }: AudioUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      // 1. Simuler une progression d'upload (dans une implémentation réelle, cela pourrait être lié à un événement réel)
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10
          return newProgress > 90 ? 90 : newProgress
        })
      }, 300)

      // 2. Uploader le fichier à Supabase
      const { data, error } = await uploadAudioFile(file, userId)
      clearInterval(progressInterval)

      if (error) {
        throw new Error(error.message)
      }

      // 3. Créer l'entrée dans la base de données via l'API
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          filename: file.name,
          originalUrl: data?.path || '',
          language: 'auto', // Détection automatique par défaut
        }),
      })

      const newFile = await response.json()
      
      if (!response.ok) {
        throw new Error(newFile.error || 'Erreur lors de la création du fichier')
      }

      setProgress(100)
      onFileAdded(newFile)

      // 4. Demander le traitement du fichier
      await fetch(`/api/files/${newFile.id}/process`, {
        method: 'POST',
      })

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue pendant l\'upload';
      setError(errorMessage);
      console.error('Erreur d\'upload:', err);
    } finally {
      setUploading(false);
    }
  }, [userId, onFileAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.ogg']
    },
    multiple: false,
    disabled: uploading
  })

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-2">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            stroke="currentColor" 
            fill="none" 
            viewBox="0 0 48 48" 
            aria-hidden="true"
          >
            <path 
              d="M24 30.0001L24 10M17 17.0001L24 10L31 17.0001" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M34 24V36C34 37.1046 33.1046 38 32 38H16C14.8954 38 14 37.1046 14 36V24" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          
          {isDragActive ? (
            <p className="text-blue-500">Déposez le fichier ici</p>
          ) : (
            <p className="text-gray-500">
              Glissez-déposez un fichier audio, ou <span className="text-blue-500">parcourez</span>
            </p>
          )}
          
          <p className="text-xs text-gray-400">
            MP3, WAV, M4A, AAC ou OGG (max 50MB)
          </p>
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 text-center">
            {progress < 100 ? 'Téléchargement en cours...' : 'Téléchargement terminé'}
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="pt-2">
        <p className="text-xs text-gray-500">
          Après le téléchargement, votre fichier sera automatiquement traité.
          La transcription peut prendre quelques instants.
        </p>
      </div>
    </div>
  )
} 