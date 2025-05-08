import React from 'react';
import { motion } from 'framer-motion';
import ComparisonTable from '../components/ComparisonTable';
import { ComparisonItem } from '../types';

const comparisonItems: ComparisonItem[] = [
  {
    feature: 'Traduction multilingue automatique',
    vocalift: true,
    competitors: true,
  },
  {
    feature: 'Conservation du ton et des émotions',
    vocalift: true,
    competitors: false,
  },
  {
    feature: 'Synthèse vocale de haute qualité',
    vocalift: true,
    competitors: true,
  },
  {
    feature: 'Installation sans code',
    vocalift: true,
    competitors: false,
  },
  {
    feature: 'API ouverte et documentation',
    vocalift: true,
    competitors: false,
  },
  {
    feature: 'Traduction temps réel',
    vocalift: true,
    competitors: false,
  },
  {
    feature: 'Sous-titres automatiques',
    vocalift: true,
    competitors: true,
  },
  {
    feature: 'Prix accessible',
    vocalift: true,
    competitors: false,
  },
];

const ComparisonSection: React.FC = () => {
  return (
    <section className="section relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-darkBlue/50 to-transparent -z-10"></div>
      
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-cyan-400">
              Comparaison
            </span>{' '}
            des solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Vocalift se démarque des autres solutions du marché par sa simplicité, sa rapidité et son prix abordable.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 rounded-xl overflow-hidden"
        >
          <ComparisonTable items={comparisonItems} />
        </motion.div>
        
        <div className="mt-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6 text-gray-300"
          >
            <span className="text-primary-400 font-medium">Plus simple, plus rapide, moins cher</span> 
            <br className="md:hidden" />
            <span className="hidden md:inline"> - </span>
            Vocalift vous offre tout ce dont vous avez besoin, sans complications.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;