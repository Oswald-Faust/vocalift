import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Volume2 } from 'lucide-react';
import { NavLink } from '../types';
import Link from 'next/link';

const navLinks: NavLink[] = [
  { id: 1, title: 'Fonctionnalités', href: '#features' },
  { id: 2, title: 'Démo', href: '#demo' },
  { id: 3, title: 'Tarifs', href: '#pricing' },
  { id: 4, title: 'Témoignages', href: '#testimonials' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-primary-500/30"
            />
            <Volume2 className="w-6 h-6 text-primary-400 relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-tight">Vocalift</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-gray-300 hover:text-primary-400 transition-colors"
            >
              {link.title}
            </a>
          ))}
          <Link href="/Login" className="text-gray-300 hover:text-primary-400 transition-colors">
            Connexion
          </Link>
          <Link href="/Register" className="btn btn-primary">
            S'inscrire
          </Link>
        </nav>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 md:hidden text-gray-300 hover:text-primary-400"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-darkBlue/95 backdrop-blur-md"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-primary-400 py-2 transition-colors"
              >
                {link.title}
              </a>
            ))}
            <Link
              href="/Login"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-primary-400 py-2 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/Register"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary w-full text-center"
            >
              S'inscrire
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;