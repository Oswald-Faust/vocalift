# Guide d'installation de Vocalift

Ce guide vous aidera à configurer l'environnement de développement pour Vocalift.

## Prérequis

- Node.js (v16 ou supérieur)
- NPM ou Yarn
- PostgreSQL (ou accès à un projet Supabase)
- Compte OpenAI avec clé API (pour Whisper et GPT-4)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-compte/vocalift.git
cd vocalift
```

### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
# Base de données
DATABASE_URL="postgresql://postgres:password@localhost:5432/vocalift"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-supabase

# OpenAI
OPENAI_API_KEY=votre-clé-api-openai

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=un-secret-aléatoire-pour-nextauth

# Options
MAX_UPLOAD_SIZE=52428800 # 50MB en octets
DAILY_UPLOAD_LIMIT=5
```

### 4. Configurer Supabase

1. Créez un nouveau projet sur [Supabase](https://supabase.io)
2. Configurez l'authentification par email (et magic link si désiré)
3. Créez un bucket de stockage nommé `audio-files` avec les permissions suivantes :
   - Storage : Activez CRUD pour les rôles authentifiés
   - Désactivez l'accès public

### 5. Configurer la base de données

Générez et exécutez les migrations Prisma :

```bash
npx prisma generate
npx prisma migrate dev
```

### 6. Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

## Configuration des webhooks (optionnel)

Pour une expérience optimale avec le traitement asynchrone des fichiers, vous pouvez configurer :

1. Webhooks Supabase pour la gestion des événements de stockage
2. Une file d'attente avec Bull/Redis pour le traitement des fichiers

## Déploiement

Pour déployer l'application en production :

### Avec Vercel

1. Connectez votre dépôt à Vercel
2. Configurez les variables d'environnement dans les paramètres du projet
3. Déployez l'application

### Avec Supabase

1. Configurez les fonctions Edge et les middlewares pour le traitement des fichiers
2. Suivez le guide de déploiement spécifique à Supabase

## Problèmes courants

- **Erreur de connexion à la base de données** : Vérifiez que votre URL de connexion est correcte et que la base de données est accessible.
- **Erreur d'authentification Supabase** : Assurez-vous que les clés d'API sont correctes et que les permissions sont bien configurées.
- **Dépassement de quota OpenAI** : Vérifiez votre solde et vos limites de requêtes sur le tableau de bord OpenAI. 