import React from 'react';
import { motion } from 'framer-motion';

interface AudioWaveformProps {
  isPlaying?: boolean;
  className?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  isPlaying = true,
  className = ''
}) => {
  // Generate random heights for the waveform bars
  const generateBars = () => {
    return Array.from({ length: 40 }, () => Math.random() * 100);
  };

  const bars = generateBars();

  return (
    <div className={`flex items-center justify-center h-20 gap-[2px] ${className}`}>
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 rounded-full bg-gradient-to-t from-primary-500 to-cyan-500"
          initial={{ height: `${height * 0.2}%` }}
          animate={{
            height: isPlaying
              ? [
                  `${height * 0.2}%`,
                  `${height * 0.8}%`,
                  `${height * 0.5}%`,
                  `${height}%`,
                  `${height * 0.4}%`,
                ]
              : `${height * 0.2}%`,
          }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 1.8,
            ease: "easeInOut",
            delay: index * 0.02,
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;