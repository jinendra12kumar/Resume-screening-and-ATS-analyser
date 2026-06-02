import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  glass = false,
  padding = 'md', // none, sm, md, lg
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  };

  const Component = onClick ? motion.div : 'div';
  
  const motionProps = onClick || hoverable
    ? {
        whileHover: { y: -3, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.03)' },
        transition: { duration: 0.25, ease: 'easeOut' },
      }
    : {};

  return (
    <Component
      onClick={onClick}
      className={`
        bg-white 
        border border-slate-100/90 
        rounded-2xl md:rounded-3xl
        shadow-premium
        transition-shadow
        ${glass ? 'glass' : ''}
        ${paddings[padding]}
        ${onClick ? 'cursor-pointer select-none' : ''}
        ${className}
      `}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
