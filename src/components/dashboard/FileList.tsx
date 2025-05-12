import { useState } from 'react'

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

interface FileListProps {
  files: FileType[]
  onFileDeleted: (fileId: string) => void
}

export default function FileList({ files, onFileDeleted }: FileListProps) {
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  // Formater la date
  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Obtenir la couleur et le texte en fonction du statut
  const getStatusInfo = (status: FileStatus) => {
    switch (status) {
      case 'UPLOADED':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Téléchargé' }
      case 'PROCESSING':
        return { color: 'bg-blue-100 text-blue-800', text: 'En traitement' }
      case 'TRANSCRIBED':
        return { color: 'bg-green-100 text-green-800', text: 'Transcrit' }
      case 'SUMMARIZED':
        return { color: 'bg-purple-100 text-purple-800', text: 'Résumé' }
      case 'TRANSLATED':
        return { color: 'bg-indigo-100 text-indigo-800', text: 'Traduit' }
      case 'ERROR':
        return { color: 'bg-red-100 text-red-800', text: 'Erreur' }
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Inconnu' }
    }
  }

  // Supprimer un fichier
  const handleDelete = async (fileId: string) => {
    if (isDeleting) return

    setIsDeleting(fileId)
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onFileDeleted(fileId)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error)
      alert('La suppression du fichier a échoué')
    } finally {
      setIsDeleting(null)
    }
  }

  // Vérifier s'il y a des fichiers
  if (files.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Vous n'avez pas encore de fichiers.</p>
        <p className="text-gray-500 mt-2">Téléchargez votre premier fichier audio pour commencer.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {files.map(file => (
        <div 
          key={file.id} 
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* En-tête du fichier */}
          <div className="p-4 bg-white flex flex-col md:flex-row justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium truncate">{file.filename}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusInfo(file.status).color}`}>
                  {getStatusInfo(file.status).text}
                </span>
              </div>
              <p className="text-sm text-gray-500">{formatDate(file.createdAt)}</p>
            </div>
            
            <div className="flex mt-3 md:mt-0 space-x-2">
              <button
                onClick={() => setExpandedFileId(expandedFileId === file.id ? null : file.id)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {expandedFileId === file.id ? 'Masquer' : 'Voir détails'}
              </button>
              
              <button
                onClick={() => handleDelete(file.id)}
                disabled={!!isDeleting}
                className={`px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors ${
                  isDeleting === file.id ? 'opacity-50 cursor-wait' : ''
                }`}
              >
                {isDeleting === file.id ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
          
          {/* Contenu détaillé (caché par défaut) */}
          {expandedFileId === file.id && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              {file.status !== 'UPLOADED' && file.status !== 'PROCESSING' && (
                <div className="space-y-4">
                  {/* Transcription */}
                  {file.transcription && (
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Transcription</h4>
                      <div className="bg-white p-3 rounded border border-gray-200 text-sm max-h-40 overflow-y-auto">
                        {file.transcription}
                      </div>
                    </div>
                  )}
                  
                  {/* Résumé */}
                  {file.summary && (
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Résumé IA</h4>
                      <div className="bg-white p-3 rounded border border-gray-200 text-sm">
                        {file.summary}
                      </div>
                    </div>
                  )}
                  
                  {/* Traduction si disponible */}
                  {file.translation && (
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Traduction</h4>
                      <div className="bg-white p-3 rounded border border-gray-200 text-sm">
                        {file.translation}
                      </div>
                    </div>
                  )}
                  
                  {/* Actions supplémentaires */}
                  <div className="flex justify-end space-x-2 pt-2">
                    <a
                      href={`/api/files/${file.id}/download`}
                      download={file.filename}
                      className="px-3 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors"
                    >
                      Télécharger les résultats
                    </a>
                  </div>
                </div>
              )}
              
              {/* Message d'attente si le fichier est en cours de traitement */}
              {(file.status === 'UPLOADED' || file.status === 'PROCESSING') && (
                <div className="text-center py-6">
                  <svg 
                    className="animate-spin h-8 w-8 text-blue-500 mx-auto" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-blue-600 mt-2">Traitement en cours, veuillez patienter...</p>
                </div>
              )}
              
              {/* Message d'erreur si le fichier a rencontré une erreur */}
              {file.status === 'ERROR' && (
                <div className="text-center py-6">
                  <div className="text-red-500 mx-auto mb-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-10 w-10 mx-auto" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                      />
                    </svg>
                  </div>
                  <p className="text-red-600">Une erreur s'est produite lors du traitement de ce fichier.</p>
                  <button 
                    className="mt-2 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                    onClick={async () => {
                      try {
                        await fetch(`/api/files/${file.id}/process`, {
                          method: 'POST',
                        })
                        // Rafraîchir la page
                        window.location.reload()
                      } catch (err) {
                        console.error("Erreur lors de la relance:", err)
                      }
                    }}
                  >
                    Réessayer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 