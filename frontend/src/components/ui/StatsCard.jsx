import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, className = '', style = {} }) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      style={style}
      className={`
        relative overflow-hidden
        bg-surface-card
        border border-border-base/50
        rounded-md p-6 shadow-md
        tilted-card
        ${className}
      `}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-on-surface-muted text-[10px] font-bold uppercase tracking-widest">{title}</span>
          {Icon && (
            <div className="p-2 bg-surface rounded-md text-primary border border-border-base">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="text-4xl font-bold text-white font-heading">
            <AnimatedCounter value={value} />
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded-sm ${isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
              <svg
                className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>{trendValue}%</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
