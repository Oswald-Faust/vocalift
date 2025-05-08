import React from 'react';
import { motion } from 'framer-motion';

interface WaveAnimationProps {
  color?: string;
  height?: number;
  width?: number;
  opacity?: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({
  color = 'primary-500',
  height = 30,
  width = 100,
  opacity = 0.5,
}) => {
  const bars = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div className="flex items-end justify-center h-full w-full gap-1 overflow-hidden">
      {bars.map((i) => {
        const baseHeight = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className={`w-1 rounded-t-full bg-${color}`}
            style={{ opacity }}
            animate={{
              height: [
                `${baseHeight * 0.4}%`,
                `${baseHeight * 0.8}%`,
                `${baseHeight * 0.6}%`,
                `${baseHeight}%`,
                `${baseHeight * 0.6}%`,
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5 + Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default WaveAnimation;