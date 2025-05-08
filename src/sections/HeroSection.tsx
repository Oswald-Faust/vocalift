import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, Languages } from 'lucide-react';
import Button from '../components/Button';
import AudioWaveform from '../components/AudioWaveform';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-500/10 via-transparent to-transparent" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-500/5 backdrop-blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-accent-500/5 backdrop-blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-darkBlue backdrop-blur-md border border-gray-800 text-sm mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mr-2"></span>
                <span>Nouveau : IA de traduction vocale</span>
              </div>
              
              <h1 className="text-white mb-6">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-cyan-400">
                  Parlez. Traduisez. Publiez.
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 md:w-5/6">
                Transformez votre voix en contenu multilingue grâce à l'IA. 
                Idéal pour les créateurs et professionnels du monde entier.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" icon={<Mic size={18} />}>
                  Tester Vocalift
                </Button>
                <Button variant="outline" size="lg">
                  Voir la démo
                </Button>
              </div>
              
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  </div>
                  <span>Installation facile</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  </div>
                  <span>Sans code</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  </div>
                  <span>Essai gratuit</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-6 rounded-xl relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 text-center text-sm text-gray-400">
                    vocalift.app
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Audio original (Français)</p>
                      <p className="text-sm text-gray-400">00:42 • 1.2 MB</p>
                    </div>
                  </div>
                  
                  <AudioWaveform className="my-4" />
                  
                  <div className="p-4 bg-dark/50 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-300">
                      "Nous sommes ravis d'annoncer le lancement de notre nouveau produit qui va révolutionner le marché. Restez à l'écoute pour plus d'informations."
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-1 h-px bg-gray-800"></div>
                    <div className="px-4">
                      <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                        <Languages className="w-5 h-5 text-accent-400" />
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-gray-800"></div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-primary-500 flex items-center justify-center">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Traduction (Anglais)</p>
                      <p className="text-sm text-gray-400">Traduit automatiquement</p>
                    </div>
                  </div>
                  
                  <AudioWaveform className="my-4" />
                  
                  <div className="p-4 bg-darkBlue/50 rounded-lg border border-primary-500/30">
                    <p className="text-sm text-gray-300">
                      "We are excited to announce the launch of our new product that will revolutionize the market. Stay tuned for more information."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;