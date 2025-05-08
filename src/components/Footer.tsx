import React from 'react';
import { Github, Twitter, Linkedin, Mail, Volume2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-darkBlue py-12 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Volume2 className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-bold">Vocalift</span>
            </a>
            <p className="text-gray-400 mb-4">
              Transformez votre voix en contenu multilingue grâce à l'IA
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Produit</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-primary-400 transition-colors">Fonctionnalités</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-primary-400 transition-colors">Démo</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-primary-400 transition-colors">Tarifs</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-primary-400 transition-colors">Témoignages</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Tutoriels</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">À propos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Équipe</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Vocalift. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Politique de confidentialité</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;