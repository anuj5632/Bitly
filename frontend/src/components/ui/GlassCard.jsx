import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  tilt = '1deg',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ '--tilt': tilt }}
      className={`
        relative overflow-hidden
        bg-surface-card
        border border-border-base/50
        rounded-md
        shadow-md
        ${hover ? 'tilted-card' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
