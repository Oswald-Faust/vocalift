import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import databaseService from '@/lib/database'

// Types spécifiques pour les requêtes
interface QueryParams {
  page?: string
  limit?: string
  status?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérification de l'authentification
  const { data: { session }, error: authError } = await supabase.auth.getSession()
  if (authError || !session) {
    return res.status(401).json({ error: 'Non authentifié' })
  }

  const userId = session.user.id

  // Gestion des différentes méthodes HTTP
  switch (req.method) {
    case 'GET':
      return getFiles(req, res, userId)
    case 'POST':
      return createFile(req, res, userId)
    default:
      return res.status(405).json({ error: 'Méthode non autorisée' })
  }
}

// Récupérer la liste des fichiers pour l'utilisateur
async function getFiles(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  try {
    const { page = '1', limit = '10', status } = req.query as QueryParams
    
    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)
    const offset = (pageNumber - 1) * limitNumber

    // Construire le filtre de statut si nécessaire
    let query = supabase
      .from('files')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
    
    if (status) {
      query = query.eq('status', status)
    }
    
    // Récupérer les fichiers avec pagination
    const { data: files, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limitNumber - 1)
    
    if (error) {
      throw error
    }

    // Calculer la pagination
    const totalFiles = count || 0
    const totalPages = Math.ceil(totalFiles / limitNumber)

    return res.status(200).json({
      files,
      pagination: {
        total: totalFiles,
        page: pageNumber,
        limit: limitNumber,
        totalPages
      }
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers:', error)
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des fichiers'
    })
  }
}

// Créer un nouveau fichier
async function createFile(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  try {
    const { filename, originalUrl, language = 'auto' } = req.body

    if (!filename || !originalUrl) {
      return res.status(400).json({
        error: 'Nom de fichier et URL d\'origine sont requis'
      })
    }

    // Vérifier le quota de l'utilisateur
    const userQuota = await databaseService.getUserQuota(userId)
    
    if (!userQuota) {
      return res.status(400).json({
        error: 'Quota utilisateur non trouvé'
      })
    }

    // Vérifier si l'utilisateur a atteint sa limite quotidienne
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count: filesSubmittedToday, error: countError } = await supabase
      .from('files')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .gte('created_at', today.toISOString())
    
    if (countError) {
      throw countError
    }

    if (filesSubmittedToday && filesSubmittedToday >= userQuota.daily_file_limit) {
      return res.status(400).json({
        error: 'Limite quotidienne de fichiers atteinte'
      })
    }

    // Vérifier si l'utilisateur a atteint sa limite totale de fichiers
    const { count: totalFiles, error: totalCountError } = await supabase
      .from('files')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
    
    if (totalCountError) {
      throw totalCountError
    }

    if (totalFiles && totalFiles >= userQuota.max_files) {
      return res.status(400).json({
        error: 'Limite totale de fichiers atteinte'
      })
    }

    // Créer le nouveau fichier
    const newFile = await databaseService.createFile({
      user_id: userId,
      filename,
      original_url: originalUrl,
      status: 'UPLOADED',
      transcription: null,
      summary: null,
      translation: null,
      language: language
    })

    if (!newFile) {
      return res.status(500).json({
        error: 'Erreur lors de la création du fichier'
      })
    }

    return res.status(201).json(newFile)
  } catch (error) {
    console.error('Erreur lors de la création du fichier:', error)
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la création du fichier'
    })
  }
} 