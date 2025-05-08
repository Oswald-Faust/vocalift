import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from '../components/TestimonialCard';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'YouTuber',
    company: 'Tech & Lifestyle',
    content: 'Vocalift m\'a permis de rendre mes vidéos accessibles à un public international sans effort. La qualité de traduction est bluffante !',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'Fondateur',
    company: 'PodcastPro',
    content: 'Notre audience a augmenté de 40% depuis que nous utilisons Vocalift pour traduire nos podcasts en anglais et en espagnol.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 3,
    name: 'Léa Chen',
    role: 'Formatrice',
    company: 'EduTech Academy',
    content: 'Je peux désormais proposer mes formations en plusieurs langues sans avoir à réenregistrer tout mon contenu. Un gain de temps incroyable !',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 4,
    name: 'Marc Leroy',
    role: 'Directeur Marketing',
    company: 'GlobalBrand',
    content: 'Vocalift nous a aidés à localiser nos vidéos promotionnelles sur 5 marchés différents en un temps record. Le ROI est exceptionnel.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 5,
    name: 'Amina Ndiaye',
    role: 'Créatrice de contenu',
    company: 'Freelance',
    content: 'La conservation du ton et des émotions dans les traductions est impressionnante. Mes followers étrangers pensent que je parle leur langue !',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 6,
    name: 'Pierre Gagnon',
    role: 'Chercheur',
    company: 'Institut Sciences Avancées',
    content: 'Grâce à Vocalift, je publie mes conférences en plusieurs langues, touchant un public académique international sans effort supplémentaire.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="section relative bg-gradient-to-b from-dark to-darkBlue/70">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            Ce qu'en disent{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-accent-400">
              nos utilisateurs
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Découvrez comment Vocalift aide les créateurs et professionnels à toucher un public international.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              content={testimonial.content}
              avatar={testimonial.avatar}
              delay={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;