import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mic, Loader, Play, Pause, Volume2 } from 'lucide-react';
import Button from '../components/Button';
import AudioWaveform from '../components/AudioWaveform';

const DemoSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleNext = () => {
    if (step === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(1);
      }, 2000);
    }
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="demo" className="section bg-darkBlue/50 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-darkBlue/30 backdrop-blur-sm -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-dark to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-dark to-transparent"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            Voyez{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-primary-400">
              Vocalift
            </span>{' '}
            en action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Essayez notre interface intuitive et transformez votre audio en contenu multilingue en quelques secondes.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-xl overflow-hidden max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-darkBlue p-4 border-b border-gray-800 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-gray-400 mx-auto">demo.vocalift.app</div>
          </div>
          
          <div className="p-6">
            {step === 0 ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-darkBlue/50 border-2 border-dashed border-gray-700 rounded-xl p-12 max-w-lg mx-auto hover:border-primary-500/50 transition-colors"
                >
                  {isLoading ? (
                    <div className="flex flex-col items-center">
                      <Loader className="w-12 h-12 text-primary-500 animate-spin mb-4" />
                      <h3 className="text-xl font-medium mb-2">Traitement en cours...</h3>
                      <p className="text-gray-400">Veuillez patienter pendant que nous analysons votre audio</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
                        <Upload className="w-8 h-8 text-primary-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Importez votre fichier audio</h3>
                      <p className="text-gray-400 mb-6">Glissez-déposez un fichier audio, ou cliquez pour parcourir</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" onClick={handleNext}>
                          Sélectionner un fichier
                        </Button>
                        <Button variant="outline" icon={<Mic size={18} />}>
                          Enregistrer directement
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-6">
                        Formats supportés: MP3, WAV, M4A, AAC • Max 30 MB
                      </p>
                    </>
                  )}
                </motion.div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium">Résultat</h3>
                  <Button variant="outline" size="sm">
                    Télécharger
                  </Button>
                </div>
                
                {/* Original audio */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium">Audio original (Français)</p>
                        <p className="text-xs text-gray-400">interview.mp3 • 1:24</p>
                      </div>
                    </div>
                    <button 
                      className="p-2 rounded-full bg-primary-500/20 hover:bg-primary-500/40 transition-colors"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  </div>
                  
                  <AudioWaveform isPlaying={isPlaying} />
                  
                  <div className="mt-4 p-3 bg-darkBlue/50 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-300">
                      "Notre startup a développé une solution novatrice qui permet aux entreprises d'automatiser leurs processus de traduction. Nous avons déjà signé plusieurs partenariats stratégiques et nous prévoyons d'étendre nos services à l'international dans les prochains mois."
                    </p>
                  </div>
                </div>
                
                {/* Translated content */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-accent-400" />
                      </div>
                      <div>
                        <p className="font-medium">Traduction (Anglais)</p>
                        <p className="text-xs text-gray-400">Traduit automatiquement</p>
                      </div>
                    </div>
                    <button 
                      className="p-2 rounded-full bg-accent-500/20 hover:bg-accent-500/40 transition-colors"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  </div>
                  
                  <AudioWaveform isPlaying={isPlaying} />
                  
                  <div className="mt-4 p-3 bg-darkBlue/50 rounded-lg border border-accent-500/30">
                    <p className="text-sm text-gray-300">
                      "Our startup has developed an innovative solution that allows companies to automate their translation processes. We have already signed several strategic partnerships and plan to expand our services internationally in the coming months."
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button variant="primary" onClick={() => setStep(0)}>
                    Essayer avec un autre fichier
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;