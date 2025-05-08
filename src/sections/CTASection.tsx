import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import WaitlistForm from '../components/WaitlistForm';

const CTASection: React.FC = () => {
  return (
    <section id="cta" className="section relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-500/5 via-dark to-dark -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-accent-500/20 text-accent-400 mb-6">
            Accès anticipé
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Prêt à rendre votre contenu{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-400 to-cyan-400">
              accessible au monde entier
            </span>
            ?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Rejoignez notre liste d'attente et soyez parmi les premiers à essayer Vocalift. Nous vous enverrons un accès prioritaire dès que nous serons prêts.
          </p>
          
          <WaitlistForm />
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
              </div>
              <span>Démarrage en 2 minutes</span>
            </div>
            
            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></div>
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
              </div>
              <span>Annulez à tout moment</span>
            </div>
            
            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></div>
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
              </div>
              <span>Support dédié</span>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-6">Déjà convaincu ? Découvrez nos offres</p>
          <Button 
            variant="outline" 
            icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
            className="group"
          >
            Voir les tarifs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;