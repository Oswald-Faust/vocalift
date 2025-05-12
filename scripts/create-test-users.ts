import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Créer le client Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

// Liste des utilisateurs de test
const testUsers = [
  {
    email: 'admin@vocalift.com',
    password: 'Admin123!',
    role: 'ADMIN',
    quota: {
      max_files: 100,
      max_file_size: 104857600, // 100MB
      daily_file_limit: 20
    }
  },
  {
    email: 'user1@example.com',
    password: 'User123!',
    role: 'USER',
    quota: {
      max_files: 10,
      max_file_size: 10485760, // 10MB
      daily_file_limit: 5
    }
  },
  {
    email: 'user2@example.com',
    password: 'User123!',
    role: 'USER',
    quota: {
      max_files: 10,
      max_file_size: 10485760, // 10MB
      daily_file_limit: 5
    }
  }
];

async function createTestUsers() {
  console.log('Création des utilisateurs de test...');

  for (const user of testUsers) {
    try {
      // 1. Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true
      });

      if (authError) {
        console.error(`Erreur lors de la création de l'utilisateur ${user.email} dans Supabase Auth:`, authError);
        continue;
      }

      if (!authData.user) {
        console.error(`Erreur: Impossible de créer l'utilisateur ${user.email} dans Supabase Auth`);
        continue;
      }

      console.log(`Utilisateur ${user.email} créé dans Supabase Auth avec l'ID: ${authData.user.id}`);

      // 2. Vérifier si l'utilisateur existe déjà dans Supabase Database
      const { data: existingUser, error: getUserError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (getUserError && getUserError.code !== 'PGRST116') { // PGRST116 = not found
        console.error(`Erreur lors de la vérification de l'utilisateur ${user.email}:`, getUserError);
        continue;
      }

      if (existingUser) {
        console.log(`L'utilisateur ${user.email} existe déjà dans Supabase Database, mise à jour...`);
        const { error: updateError } = await supabase
          .from('users')
          .update({
            email: user.email,
            role: user.role
          })
          .eq('id', authData.user.id);

        if (updateError) {
          console.error(`Erreur lors de la mise à jour de l'utilisateur ${user.email}:`, updateError);
        } else {
          console.log(`Utilisateur ${user.email} mis à jour`);
        }

        // Mise à jour du quota
        const { error: updateQuotaError } = await supabase
          .from('user_quotas')
          .update(user.quota)
          .eq('user_id', authData.user.id);

        if (updateQuotaError) {
          console.error(`Erreur lors de la mise à jour du quota pour ${user.email}:`, updateQuotaError);
        }
      } else {
        // 3. Créer l'utilisateur dans Supabase Database
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: authData.user.id,
            email: user.email,
            role: user.role
          }]);

        if (insertError) {
          console.error(`Erreur lors de la création de l'utilisateur ${user.email} dans Supabase Database:`, insertError);
          continue;
        }

        console.log(`Utilisateur ${user.email} créé dans Supabase Database`);

        // 4. Créer un quota pour l'utilisateur
        const { error: quotaError } = await supabase
          .from('user_quotas')
          .insert([{
            user_id: authData.user.id,
            ...user.quota
          }]);

        if (quotaError) {
          console.error(`Erreur lors de la création du quota pour ${user.email}:`, quotaError);
        } else {
          console.log(`Quota créé pour l'utilisateur ${user.email}`);
        }
      }
    } catch (error) {
      console.error(`Erreur lors de la création de l'utilisateur ${user.email}:`, error);
    }
  }

  console.log('Création des utilisateurs de test terminée');
}

// Exécuter le script
createTestUsers()
  .catch((error) => {
    console.error('Erreur lors de l\'exécution du script:', error);
  }); 