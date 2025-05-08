import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: 1,
    title: 'Transcription IA avancée',
    description: 'Notre IA transcrit précisément votre contenu audio avec une reconnaissance vocale de pointe et une excellente compréhension du contexte.',
    icon: 'FileText',
  },
  {
    id: 2,
    title: 'Traduction multilingue',
    description: 'Traduisez instantanément vos contenus vers plus de 20 langues tout en préservant le ton, les expressions et le contexte.',
    icon: 'Languages',
  },
  {
    id: 3,
    title: 'Génération vocale naturelle',
    description: 'Convertissez vos traductions en audio réaliste avec des voix naturelles qui conservent l\'intonation et l\'émotion de l\'original.',
    icon: 'Mic2',
  },
  {
    id: 4,
    title: 'Export multi-formats',
    description: 'Exportez vos transcriptions et traductions en TXT, SRT, MP3 et plus pour une intégration facile à votre workflow.',
    icon: 'FileOutput',
  },
  {
    id: 5,
    title: 'Édition collaborative',
    description: 'Invitez des collaborateurs pour réviser et modifier les transcriptions et les traductions en temps réel.',
    icon: 'Users',
  },
  {
    id: 6,
    title: 'API simple et puissante',
    description: 'Intégrez Vocalift à vos outils existants grâce à notre API flexible et notre documentation claire.',
    icon: 'Code',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="section relative">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            Fonctionnalités{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
              intelligentes
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Vocalift combine l'IA de pointe avec une interface intuitive pour transformer votre voix en contenu multilingue de qualité professionnelle.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;