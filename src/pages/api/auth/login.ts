import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/lib/supabase';
import databaseService from '@/lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email et mot de passe sont requis'
      });
    }

    // Authentifier l'utilisateur avec Supabase
    const { data, error } = await signIn(email, password);

    if (error) {
      return res.status(401).json({
        error: error.message
      });
    }

    // Vérifier que l'utilisateur existe
    if (!data.user) {
      return res.status(401).json({
        error: "Informations d'authentification invalides"
      });
    }

    // Récupérer les informations utilisateur depuis notre base de données
    let user = await databaseService.getUserById(data.user.id);

    if (!user) {
      // Si l'utilisateur existe dans Supabase Auth mais pas dans notre base
      // Créer l'utilisateur dans Supabase (cas de migration ou problème)
      user = await databaseService.createUser({
        id: data.user.id,
        email: data.user.email || ''
      });

      if (user) {
        // Créer un quota pour l'utilisateur
        await databaseService.createUserQuota(user.id);
      }
    }

    // Récupérer le quota de l'utilisateur
    const quota = user ? await databaseService.getUserQuota(user.id) : null;

    return res.status(200).json({
      user: {
        ...user,
        quota
      },
      session: data.session
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({
      error: 'Une erreur est survenue lors de la connexion'
    });
  }
} 