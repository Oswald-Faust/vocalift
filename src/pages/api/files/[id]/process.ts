import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]'
import { transcribeAudio, generateSummary, translateText } from '@/lib/ai-service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier l'authentification
  const session = await getServerSession(req, res, authOptions)
  
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Non autorisé' })
  }

  // Vérifier si la méthode est POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée` })
  }

  // Récupérer l'ID du fichier depuis l'URL
  const fileId = req.query.id as string

  try {
    // Récupérer le fichier depuis la base de données
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    })

    // Vérifier si le fichier existe
    if (!file) {
      return res.status(404).json({ error: 'Fichier non trouvé' })
    }

    // Vérifier si l'utilisateur est autorisé à traiter ce fichier
    if (file.userId !== session.user.id) {
      // Vérifier si l'utilisateur est admin
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      })

      if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Non autorisé à traiter ce fichier' })
      }
    }

    // Démarrer le traitement asynchrone
    // Dans une application réelle, cela devrait être placé dans une file d'attente de travail
    // comme Bull ou être géré par une fonction cloud (AWS Lambda, Google Cloud Functions, etc.)
    processFileAsync(fileId, file.originalUrl, file.language || 'auto')
      .catch(err => console.error('Erreur lors du traitement asynchrone:', err))

    // Répondre immédiatement que le traitement est en cours
    return res.status(202).json({ 
      message: 'Traitement du fichier démarré',
      fileId
    })
  } catch (error) {
    console.error('Erreur lors du traitement du fichier:', error)
    return res.status(500).json({ error: 'Erreur serveur lors du traitement du fichier' })
  }
}

// Fonction asynchrone pour traiter le fichier
async function processFileAsync(fileId: string, audioUrl: string, language: string) {
  try {
    // 1. Transcription avec Whisper
    const transcription = await transcribeAudio(fileId, audioUrl)
    
    // 2. Génération de résumé avec GPT-4
    const summary = await generateSummary(fileId, transcription)
    
    // 3. Traduction si nécessaire (seulement si la langue n'est pas auto ou fr)
    if (language !== 'auto' && language !== 'fr') {
      await translateText(fileId, transcription, 'fr')
    }
    
    console.log(`Traitement réussi pour le fichier ${fileId}`)
  } catch (error) {
    console.error(`Erreur lors du traitement du fichier ${fileId}:`, error)
    
    // Mettre à jour le statut du fichier en cas d'erreur
    await prisma.file.update({
      where: { id: fileId },
      data: { 
        status: 'ERROR',
      },
    })
    
    // Enregistrer l'erreur dans les logs
    await prisma.aiLog.upsert({
      where: { fileId },
      update: { 
        error: error instanceof Error ? error.message : String(error)
      },
      create: {
        fileId,
        error: error instanceof Error ? error.message : String(error)
      }
    })
  }
} 