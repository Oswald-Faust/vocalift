import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import databaseService from '@/lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // 1. Vérifier l'authentification via le token dans le header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Non authentifié' });
    }

    // 2. Vérifier le token avec Supabase
    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Token invalide' });
    }

    // 3. Récupérer les données utilisateur depuis notre base de données
    const user = await databaseService.getUserById(authData.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // 4. Récupérer le quota de l'utilisateur
    const quota = await databaseService.getUserQuota(user.id);

    // 5. Renvoyer les données utilisateur
    return res.status(200).json({
      user: {
        ...user,
        quota
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la récupération des données utilisateur'
    });
  }
} 