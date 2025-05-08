import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  icon,
  fullWidth = false,
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all";
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg hover:shadow-primary-500/20",
    secondary: "bg-accent-500 text-white hover:bg-accent-600 shadow-md hover:shadow-lg hover:shadow-accent-500/20",
    outline: "bg-transparent border-2 border-gray-500 hover:border-primary-400 hover:text-primary-400",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;