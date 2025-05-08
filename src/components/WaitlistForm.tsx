import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Button from './Button';

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!submitted ? (
        <motion.form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="w-full px-4 py-3 bg-darkBlue/40 border border-gray-700 focus:border-primary-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              required
            />
          </div>
          <Button 
            variant="primary" 
            fullWidth
            className="group"
            icon={loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            )}
          >
            {loading ? 'Inscription en cours...' : 'Rejoindre la liste d\'attente'}
          </Button>
          <p className="text-xs text-gray-400 text-center">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 glass-card"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/20 mb-4">
            <Check size={24} className="text-primary-500" />
          </div>
          <h4 className="text-xl font-semibold mb-2">Merci pour votre inscription !</h4>
          <p className="text-gray-400">
            Nous vous contacterons dès que Vocalift sera disponible.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default WaitlistForm;