# Architecture de Vocalift

Ce document décrit l'architecture technique et les choix de conception pour le projet Vocalift.

## Vue d'ensemble

Vocalift est une application SaaS de traitement audio qui permet aux utilisateurs de:
1. Télécharger des fichiers audio ou enregistrer directement via le microphone
2. Transcrire automatiquement les fichiers audio en texte
3. Résumer intelligemment le contenu transcrit
4. Traduire le contenu si nécessaire

L'application est conçue selon une architecture moderne, utilisant des services cloud et des APIs d'intelligence artificielle.

## Architecture technique

### Frontend

- **Framework**: Next.js 14+ avec App Router
- **Rendu**: Combinaison de rendu côté serveur (SSR) et côté client (CSR)
- **UI**: Tailwind CSS pour le styling, avec composants personnalisés
- **État**: React Hooks et Context API
- **Formulaires**: React Hook Form avec validation Zod
- **Requêtes API**: Axios et SWR pour la gestion du cache et des états de chargement

### Backend

- **API Routes**: Routes API Next.js (pages/api)
- **Base de données**: PostgreSQL hébergé sur Supabase
- **ORM**: Prisma pour l'interaction avec la base de données
- **Authentification**: Supabase Auth + NextAuth.js
- **Stockage**: Supabase Storage pour les fichiers audio

### Intelligence Artificielle

- **Transcription**: OpenAI Whisper via API
- **Résumé et traduction**: OpenAI GPT-4 via API

## Schéma de données

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │    File     │       │   AiLog     │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ email       │       │ userId      │──────>│ fileId      │
│ role        │       │ filename    │       │ whisperDur. │
│ createdAt   │───┐   │ originalUrl │       │ gptTokens   │
│ updatedAt   │   │   │ transcription│      │ error       │
└─────────────┘   │   │ summary     │       │ createdAt   │
                  │   │ translation │       └─────────────┘
                  │   │ language    │
┌─────────────┐   │   │ status      │
│ UserQuota   │   │   │ createdAt   │
├─────────────┤   │   │ updatedAt   │
│ id          │   │   └─────────────┘
│ userId      │<──┘
│ maxFiles    │
│ maxFileSize │
│ dailyLimit  │
│ createdAt   │
│ updatedAt   │
└─────────────┘
```

## Flux de données

1. **Upload de fichier**:
   - Utilisateur -> Frontend -> Supabase Storage -> Base de données
   - Notification de nouveau fichier -> File processing queue

2. **Traitement du fichier**:
   - Queue de processing -> API Whisper -> Mise à jour du statut et des logs
   - Résultat de transcription -> API GPT-4 -> Résumé/Traduction
   - Mise à jour de la base de données avec les résultats

3. **Consultation des résultats**:
   - Frontend query -> API routes -> Prisma -> Base de données
   - Résultats -> Affichage à l'utilisateur

## Sécurité

- **Authentification**: Supabase Auth avec validation JWT
- **Autorisation**: Middleware de vérification de rôle pour les routes protégées
- **Stockage**: Accès aux fichiers limité aux propriétaires et admins 
- **API**: Rate limiting et validation des entrées
- **CORS**: Configuration stricte pour limiter les origines
- **Mots de passe**: Hachage sécurisé via Supabase Auth

## Mise à l'échelle

L'architecture est conçue pour une mise à l'échelle horizontale:

- **Frontend**: Déploiement sur Vercel (mise à l'échelle automatique)
- **Base de données**: Supabase avec possibilité de mise à l'échelle
- **Traitement des fichiers**: Architecture asynchrone avec file d'attente
- **Performances**: Caching des requêtes via SWR, optimisation des images

## Monitoring et Logging

- Logs d'utilisation des APIs OpenAI (coûts et performances)
- Logs d'erreurs centralisés
- Métriques d'utilisation par utilisateur
- Analytics pour administrateurs

## Extensibilité

L'architecture modulaire permet d'ajouter facilement:
- De nouveaux modèles d'IA
- Des intégrations avec d'autres services (Notion, Slack, etc.)
- Des fonctionnalités premium
- Des langues supplémentaires 