import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Languages, Play, Download, FileAudio, X, Volume2, FileText, Subtitles } from 'lucide-react';
import Button from '../components/Button';
import AudioWaveform from '../components/AudioWaveform';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

const AudioTranslate: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState<string>('fr');
  const [targetLang, setTargetLang] = useState<string>('en');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generateAI, setGenerateAI] = useState(true);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const audioFile = acceptedFiles[0];
    if (audioFile && audioFile.type.startsWith('audio/')) {
      setFile(audioFile);
    }
  }, []);

  const handleStartTranslation = () => {
    setIsProcessing(true);
    // Simulate translation process
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 3000);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsComplete(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Traduire un audio</h1>
        <p className="text-gray-400">
          Importez votre fichier audio et laissez notre IA s'occuper de la traduction
        </p>
      </div>

      <div className="glass-card p-6 mb-6">
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors"
            >
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Déposez votre fichier audio</h3>
                <p className="text-gray-400 mb-6">
                  Glissez-déposez un fichier audio, ou cliquez pour parcourir
                </p>
                <Button variant="primary" onClick={() => {}}>
                  Sélectionner un fichier
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  Formats supportés: MP3, WAV, AAC • Max 30 MB
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* File info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <FileAudio className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Language selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Langue source
                  </label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full px-4 py-3 bg-darkBlue/40 border border-gray-700 focus:border-primary-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Langue cible
                  </label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full px-4 py-3 bg-darkBlue/40 border border-gray-700 focus:border-primary-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* AI voice generation option */}
              <div className="flex items-center">
                <input
                  id="ai-voice"
                  type="checkbox"
                  checked={generateAI}
                  onChange={(e) => setGenerateAI(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-700 bg-darkBlue/40 text-primary-500 focus:ring-primary-500/50"
                />
                <label htmlFor="ai-voice" className="ml-2 block text-sm text-gray-300">
                  Générer une voix IA dans la langue cible
                </label>
              </div>

              {/* Translation button */}
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  onClick={handleStartTranslation}
                  disabled={isProcessing}
                  icon={
                    isProcessing ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <Languages className="w-5 h-5" />
                    )
                  }
                >
                  {isProcessing ? 'Traduction en cours...' : 'Lancer la traduction'}
                </Button>
              </div>

              {/* Results */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-6 border-t border-gray-800"
                >
                  {/* Original audio */}
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                          <Volume2 className="w-4 h-4 text-primary-400" />
                        </div>
                        <div>
                          <p className="font-medium">Audio original (Français)</p>
                          <p className="text-xs text-gray-400">1:24 • Transcription</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-primary-500/20 hover:bg-primary-500/40 transition-colors"
                      >
                        {isPlaying ? (
                          <span className="w-4 h-4 block bg-primary-400"></span>
                        ) : (
                          <Play className="w-4 h-4 text-primary-400" />
                        )}
                      </button>
                    </div>

                    <AudioWaveform isPlaying={isPlaying} />

                    <div className="mt-4 p-3 bg-darkBlue/50 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-300">
                        "Notre startup a développé une solution novatrice qui permet aux entreprises d'automatiser leurs processus de traduction..."
                      </p>
                    </div>
                  </div>

                  {/* Translated version */}
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                          <Volume2 className="w-4 h-4 text-accent-400" />
                        </div>
                        <div>
                          <p className="font-medium">Traduction (English)</p>
                          <p className="text-xs text-gray-400">Généré par IA</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-accent-500/20 hover:bg-accent-500/40 transition-colors"
                      >
                        {isPlaying ? (
                          <span className="w-4 h-4 block bg-accent-400"></span>
                        ) : (
                          <Play className="w-4 h-4 text-accent-400" />
                        )}
                      </button>
                    </div>

                    <AudioWaveform isPlaying={isPlaying} />

                    <div className="mt-4 p-3 bg-darkBlue/50 rounded-lg border border-accent-500/30">
                      <p className="text-sm text-gray-300">
                        "Our startup has developed an innovative solution that allows companies to automate their translation processes..."
                      </p>
                    </div>
                  </div>

                  {/* Export options */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      icon={<FileText className="w-4 h-4" />}
                    >
                      Exporter en TXT
                    </Button>
                    <Button
                      variant="outline"
                      icon={<FileAudio className="w-4 h-4" />}
                    >
                      Télécharger MP3
                    </Button>
                    <Button
                      variant="outline"
                      icon={<Subtitles className="w-4 h-4" />}
                    >
                      Sous-titres SRT
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AudioTranslate;