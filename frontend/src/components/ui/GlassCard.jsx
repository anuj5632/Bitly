import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'p-6',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`
        relative overflow-hidden
        bg-dark-900/50 backdrop-blur-xl
        border border-dark-700/50
        rounded-2xl
        shadow-glass
        ${glow ? 'shadow-glow' : ''}
        ${hover ? 'card-hover' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
