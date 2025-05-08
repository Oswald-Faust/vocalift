import { Feature, Testimonial, ComparisonItem } from '../types';

export const features: Feature[] = [
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

export const testimonials: Testimonial[] = [
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

export const comparisonItems: ComparisonItem[] = [
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