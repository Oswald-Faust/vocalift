import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '../../auth/[...nextauth]'
import { deleteAudioFile } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier l'authentification
  const session = await getServerSession(req, res, authOptions)
  
  if (!session || !session.user) {
    return res.status(401).json({ error: 'Non autorisé' })
  }

  // Récupérer l'ID du fichier depuis l'URL
  const fileId = req.query.id as string

  // Traiter la requête en fonction de la méthode HTTP
  switch (req.method) {
    case 'GET':
      return getFile(req, res, fileId, session.user.id)
    case 'DELETE':
      return deleteFile(req, res, fileId, session.user.id)
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      return res.status(405).json({ error: `Méthode ${req.method} non autorisée` })
  }
}

// Récupérer un fichier spécifique
async function getFile(
  req: NextApiRequest,
  res: NextApiResponse,
  fileId: string,
  userId: string
) {
  try {
    // Récupérer le fichier
    const file = await prisma.file.findUnique({
      where: { id: fileId },
      include: {
        aiLog: true,
      },
    })

    // Vérifier si le fichier existe
    if (!file) {
      return res.status(404).json({ error: 'Fichier non trouvé' })
    }

    // Vérifier si l'utilisateur est autorisé à voir ce fichier
    if (file.userId !== userId) {
      // Vérifier si l'utilisateur est admin
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Non autorisé à accéder à ce fichier' })
      }
    }

    return res.status(200).json(file)
  } catch (error) {
    console.error('Erreur lors de la récupération du fichier:', error)
    return res.status(500).json({ error: 'Erreur serveur lors de la récupération du fichier' })
  }
}

// Supprimer un fichier
async function deleteFile(
  req: NextApiRequest,
  res: NextApiResponse,
  fileId: string,
  userId: string
) {
  try {
    // Récupérer le fichier
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    })

    // Vérifier si le fichier existe
    if (!file) {
      return res.status(404).json({ error: 'Fichier non trouvé' })
    }

    // Vérifier si l'utilisateur est autorisé à supprimer ce fichier
    if (file.userId !== userId) {
      // Vérifier si l'utilisateur est admin
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Non autorisé à supprimer ce fichier' })
      }
    }

    // Supprimer le fichier de Supabase Storage
    const { error: storageError } = await deleteAudioFile(file.originalUrl)
    
    if (storageError) {
      console.error('Erreur lors de la suppression du fichier dans le stockage:', storageError)
      // On continue malgré l'erreur pour nettoyer la base de données
    }

    // Supprimer le fichier de la base de données
    // Les logs d'IA seront supprimés automatiquement grâce à la relation onDelete: Cascade
    await prisma.file.delete({
      where: { id: fileId },
    })

    return res.status(200).json({ message: 'Fichier supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du fichier:', error)
    return res.status(500).json({ error: 'Erreur serveur lors de la suppression du fichier' })
  }
} 