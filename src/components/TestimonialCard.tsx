import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  content,
  avatar,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5,
        delay: delay * 0.1
      }}
      className="glass-card p-6 relative"
    >
      <div className="absolute -top-3 left-6 text-accent-500">
        <Quote size={24} />
      </div>
      <div className="mt-4">
        <p className="text-gray-300 mb-6">{content}</p>
        <div className="flex items-center">
          <img 
            src={avatar} 
            alt={name} 
            className="w-12 h-12 rounded-full mr-4 border-2 border-primary-500/50"
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-400">{role}, {company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;