import OpenAI from 'openai';
import databaseService from './database';
import { supabase } from './supabase';
import type { File } from './database';

// Type pour représenter un log d'IA
interface AiLog {
  id: string;
  file_id: string;
  whisper_duration?: number;
  gpt_tokens?: number;
  error?: string;
  created_at: string;
}

// Initialisation de l'API OpenAI (si vous avez la clé d'API)
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Service pour traiter les fichiers avec l'IA
export const aiService = {
  // Transcription avec Whisper
  transcribeAudio: async (fileId: string): Promise<boolean> => {
    try {
      // Récupérer les informations du fichier
      const file = await databaseService.getFileById(fileId);
      
      if (!file) {
        console.error(`Fichier non trouvé: ${fileId}`);
        return false;
      }
      
      // Simuler un traitement Whisper pour le moment
      console.log(`Transcription du fichier audio: ${file.filename}`);
      
      // Attendre un peu pour simuler le traitement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Générer une transcription aléatoire
      const transcription = `Transcription du fichier ${file.filename}. Ceci est un exemple de transcription générée.`;
      
      // Mettre à jour le fichier avec la transcription et changer son statut
      await databaseService.updateFile(fileId, {
        transcription,
        status: 'TRANSCRIBED'
      });
      
      // Journaliser l'utilisation de l'IA
      await aiService.logAiUsage(fileId, {
        whisper_duration: Math.floor(Math.random() * 10) + 5 // 5-15 secondes
      });
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la transcription:', error);
      
      // Marquer le fichier comme en erreur
      try {
        await databaseService.updateFile(fileId, {
          status: 'ERROR'
        });
        
        // Journaliser l'erreur
        await aiService.logAiError(fileId, error);
      } catch (logError) {
        console.error('Erreur lors de la journalisation de l\'erreur:', logError);
      }
      
      return false;
    }
  },
  
  // Résumé avec GPT
  summarizeTranscription: async (fileId: string): Promise<boolean> => {
    try {
      // Récupérer les informations du fichier
      const file = await databaseService.getFileById(fileId);
      
      if (!file || !file.transcription) {
        console.error(`Fichier non trouvé ou non transcrit: ${fileId}`);
        return false;
      }
      
      // Simuler un traitement GPT pour le moment
      console.log(`Résumé de la transcription: ${file.filename}`);
      
      // Attendre un peu pour simuler le traitement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Générer un résumé aléatoire
      const summary = `Résumé: Ceci est un court résumé de la transcription du fichier ${file.filename}.`;
      
      // Mettre à jour le fichier avec le résumé et changer son statut
      await databaseService.updateFile(fileId, {
        summary,
        status: 'SUMMARIZED'
      });
      
      // Mettre à jour l'utilisation de l'IA
      await aiService.updateAiUsage(fileId, {
        gpt_tokens: Math.floor(Math.random() * 500) + 100 // 100-600 tokens
      });
      
      return true;
    } catch (error) {
      console.error('Erreur lors du résumé:', error);
      
      // Marquer le fichier comme en erreur
      try {
        await databaseService.updateFile(fileId, {
          status: 'ERROR'
        });
        
        // Journaliser l'erreur
        await aiService.logAiError(fileId, error);
      } catch (logError) {
        console.error('Erreur lors de la journalisation de l\'erreur:', logError);
      }
      
      return false;
    }
  },
  
  // Traduction avec GPT
  translateTranscription: async (fileId: string, targetLanguage: string): Promise<boolean> => {
    try {
      // Récupérer les informations du fichier
      const file = await databaseService.getFileById(fileId);
      
      if (!file || !file.transcription) {
        console.error(`Fichier non trouvé ou non transcrit: ${fileId}`);
        return false;
      }
      
      // Simuler un traitement GPT pour le moment
      console.log(`Traduction en ${targetLanguage} de: ${file.filename}`);
      
      // Attendre un peu pour simuler le traitement
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Générer une traduction aléatoire
      const translation = `Traduction en ${targetLanguage}: Ceci est une traduction de la transcription du fichier ${file.filename}.`;
      
      // Mettre à jour le fichier avec la traduction et changer son statut
      await databaseService.updateFile(fileId, {
        translation,
        language: targetLanguage,
        status: 'TRANSLATED'
      });
      
      // Récupérer l'utilisation actuelle de l'IA
      const aiLog = await aiService.getAiLog(fileId);
      
      // Mettre à jour l'utilisation de l'IA
      const currentTokens = aiLog?.gpt_tokens || 0;
      const translationTokens = Math.floor(Math.random() * 400) + 100; // 100-500 tokens
      
      await aiService.updateAiUsage(fileId, {
        gpt_tokens: currentTokens + translationTokens
      });
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la traduction:', error);
      
      // Marquer le fichier comme en erreur
      try {
        await databaseService.updateFile(fileId, {
          status: 'ERROR'
        });
        
        // Journaliser l'erreur
        await aiService.logAiError(fileId, error);
      } catch (logError) {
        console.error('Erreur lors de la journalisation de l\'erreur:', logError);
      }
      
      return false;
    }
  },
  
  // Journalisation de l'utilisation de l'IA
  logAiUsage: async (fileId: string, usage: { whisper_duration?: number, gpt_tokens?: number }): Promise<void> => {
    try {
      const { data: existingLog } = await supabase
        .from('ai_logs')
        .select('*')
        .eq('file_id', fileId)
        .single();
      
      if (existingLog) {
        // Mettre à jour le log existant
        await supabase
          .from('ai_logs')
          .update({
            whisper_duration: usage.whisper_duration || existingLog.whisper_duration,
            gpt_tokens: usage.gpt_tokens || existingLog.gpt_tokens
          })
          .eq('file_id', fileId);
      } else {
        // Créer un nouveau log
        await supabase
          .from('ai_logs')
          .insert([{
            file_id: fileId,
            whisper_duration: usage.whisper_duration,
            gpt_tokens: usage.gpt_tokens
          }]);
      }
    } catch (error) {
      console.error('Erreur lors de la journalisation de l\'utilisation de l\'IA:', error);
    }
  },
  
  // Mise à jour de l'utilisation de l'IA
  updateAiUsage: async (fileId: string, usage: { whisper_duration?: number, gpt_tokens?: number }): Promise<void> => {
    await aiService.logAiUsage(fileId, usage);
  },
  
  // Journalisation des erreurs d'IA
  logAiError: async (fileId: string, error: unknown): Promise<void> => {
    try {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      await supabase
        .from('ai_logs')
        .upsert([{
          file_id: fileId,
          error: errorMessage
        }], {
          onConflict: 'file_id'
        });
    } catch (logError) {
      console.error('Erreur lors de la journalisation de l\'erreur d\'IA:', logError);
    }
  },
  
  // Récupération du log d'IA
  getAiLog: async (fileId: string): Promise<AiLog | null> => {
    try {
      const { data, error } = await supabase
        .from('ai_logs')
        .select('*')
        .eq('file_id', fileId)
        .single();
      
      if (error || !data) {
        return null;
      }
      
      return data as AiLog;
    } catch (error) {
      console.error('Erreur lors de la récupération du log d\'IA:', error);
      return null;
    }
  }
};

export default aiService;
