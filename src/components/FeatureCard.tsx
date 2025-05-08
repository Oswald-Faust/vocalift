import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

type IconName = keyof typeof LucideIcons;

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  delay = 0
}) => {
  const IconComponent = LucideIcons[icon as IconName] || LucideIcons.CircleDot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5,
        delay: delay * 0.1
      }}
      className="feature-card"
    >
      <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-accent-500/20 to-primary-500/20">
        <IconComponent size={24} className="text-cyan-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;