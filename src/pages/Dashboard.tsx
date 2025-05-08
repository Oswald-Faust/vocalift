import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Languages } from 'lucide-react';
import AudioWaveform from '../components/AudioWaveform';

const Dashboard: React.FC = () => {
  const recentProjects = [
    {
      id: 1,
      name: 'Interview client.mp3',
      status: 'completed',
      duration: '2:34',
      fromLang: 'FR',
      toLang: 'EN',
      date: '2024-03-15',
    },
    {
      id: 2,
      name: 'Présentation produit.mp3',
      status: 'processing',
      duration: '5:21',
      fromLang: 'FR',
      toLang: 'ES',
      date: '2024-03-14',
    },
    {
      id: 3,
      name: 'Podcast EP12.mp3',
      status: 'completed',
      duration: '15:45',
      fromLang: 'EN',
      toLang: 'FR',
      date: '2024-03-13',
    },
  ];

  const stats = [
    {
      name: 'Traductions totales',
      value: '24',
      icon: Languages,
      change: '+4 cette semaine',
      changeType: 'positive',
    },
    {
      name: 'Minutes traduites',
      value: '156',
      icon: Clock,
      change: '+28 cette semaine',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">
          Bonjour, Thomas 👋
        </h1>
        <p className="text-gray-400">
          Bienvenue sur votre tableau de bord Vocalift
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6">Projets récents</h2>
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-darkBlue/50 rounded-lg p-4 hover:bg-darkBlue/70 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-500/30 transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-400">
                      {project.duration} • {project.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{project.fromLang}</span>
                  <Languages className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">{project.toLang}</span>
                </div>
              </div>
              
              <AudioWaveform 
                isPlaying={false} 
                className="h-12"
              />
              
              <div className="mt-4 flex justify-between items-center">
                <span className={`text-sm ${
                  project.status === 'completed' 
                    ? 'text-green-400' 
                    : 'text-amber-400'
                }`}>
                  {project.status === 'completed' ? 'Terminé' : 'En cours...'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;