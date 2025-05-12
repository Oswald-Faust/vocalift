import { NextApiRequest, NextApiResponse } from 'next';
import { signUp } from '@/lib/supabase';
import databaseService from '@/lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        error: 'Email, mot de passe et nom complet sont requis'
      });
    }

    // 1. Créer l'utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await signUp(email, password);

    if (authError) {
      return res.status(400).json({
        error: authError.message
      });
    }

    // Vérifier que l'utilisateur a bien été créé
    if (!authData.user) {
      return res.status(500).json({
        error: "Erreur lors de la création de l'utilisateur dans Supabase"
      });
    }

    // 2. Créer l'utilisateur dans notre base de données Supabase
    const user = await databaseService.createUser({
      id: authData.user.id,
      email: email
    });

    if (!user) {
      return res.status(500).json({
        error: "Erreur lors de la création de l'utilisateur dans la base de données"
      });
    }

    // 3. Créer un quota pour l'utilisateur
    const quota = await databaseService.createUserQuota(authData.user.id);

    if (!quota) {
      console.warn(`Impossible de créer un quota pour l'utilisateur ${authData.user.id}`);
    }

    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création du compte:', error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de la création du compte"
    });
  }
} 