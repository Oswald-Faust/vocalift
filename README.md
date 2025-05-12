# VOCALIFT

Plateforme SaaS de transcription, résumé et traduction de messages vocaux et audios.

## 🎯 Objectif

Permettre aux utilisateurs d'envoyer des messages vocaux (ou des fichiers audio) pour:
- Les convertir en texte via transcription automatique
- Les résumer intelligemment avec l'IA
- Les traduire dans différentes langues

## 🚀 Stack Technique

| Côté | Technologies |
|------|--------------|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Base de données | Supabase (PostgreSQL) |
| IA | OpenAI Whisper (STT), GPT-4 (Résumé + Traduction) |
| Stockage de fichiers | Supabase Storage |
| Authentification | Supabase Auth |
| Hosting | Vercel / Supabase |

## 📋 Fonctionnalités principales

### Utilisateurs
- Création de compte (email + mot de passe ou magic link)
- Upload de fichiers audio ou enregistrement via micro
- Visualisation des transcriptions, résumés et traductions
- Gestion des fichiers (renommer, supprimer, télécharger)
- Historique avec filtres (date, statut, langue, etc.)

### Administrateurs
- Gestion des utilisateurs
- Supervision des fichiers
- Analyse des logs d'IA
- Statistiques d'utilisation
- Gestion des quotas

## 💻 Installation et démarrage

```bash
# Installation des dépendances
npm install

# Mode développement
npm run dev

# Build pour production
npm run build
```

## 🛠️ Structure du projet

```
vocalift/
├── src/
│   ├── components/     # Composants UI réutilisables
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Bibliothèques et utilitaires
│   ├── pages/          # Pages de l'application
│   ├── services/       # Services (API, Supabase, IA)
│   ├── styles/         # Styles globaux
│   └── types/          # Types TypeScript
├── public/             # Fichiers statiques
└── prisma/             # Schéma Prisma et migrations
```

## 📝 Licence

Tous droits réservés © Vocalift 2023
